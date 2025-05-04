// File: src/GamePanel.ts
import { Maze } from './Maze';
import { Player } from './Player';
import { Enemy } from './Enemy';
import { Collectible } from './Collectible';
import { PowerUp } from './PowerUp';
import { ImmunityPowerUp } from './ImmunityPowerUp';
import { Inventory } from './Inventory';
import { Leaderboard } from './Leaderboard';
import { StatsTracker } from './StatsTracker';
import { Sprite } from './Sprite';
import {TimeReductionPowerUp} from "./TimeReductionPowerUp";
import {TimeIncreasePowerUp} from "./TimeIncreasePowerUp";
import {ScoreBoostPowerUp} from "./ScoreBoostPowerUp";
import {ShieldPowerUp} from "./ShieldPowerUp";
import {SpeedBoostPowerUp} from "./SpeedBoostPowerUp";

export class GamePanel {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    statusLabel: HTMLDivElement;
    private timerId: number;
    maze!: Maze;
    player!: Player;
    enemies: Enemy[] = [];
    collectibles: Collectible[] = [];
    powerUps: PowerUp[] = [];
    exit!: Sprite;
    timeRemaining: number = 60;
    collisionEnabled: boolean = false;
    private clockTicks: number = 0;
    scoreBoostBase = 10;
    timeScoreRatio = 2;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.canvas.style.border = '2px solid #333';
        this.canvas.style.background = '#f0f0f0';

        this.ctx = this.canvas.getContext('2d')!;
        this.statusLabel = document.createElement('div');
        this.initGame();
        window.addEventListener('keydown', e => this.onKeyDown(e));
        window.addEventListener('keyup', e => this.onKeyUp(e));
        this.timerId = window.setInterval(() => this.gameLoop(), 100);
    }

    private initGame() {
        this.maze = new Maze(this);
        this.player = new Player(this, this.maze);
        this.maze.setupEnemies(this, this.player);
        this.enemies = this.maze.getEnemies();
        this.exit = this.maze.getExit();
        this.collectibles = [];
        this.powerUps = [];
        this.setupCollectibles();
        this.setupPowerUps();
    }

    private setupCollectibles() {
        const layout = this.maze.getMazeLayout();
        for (let i = 0; i < 3; i++) {
            let col: number, row: number;
            do {
                col = Math.floor(Math.random() * layout[0].length);
                row = Math.floor(Math.random() * layout.length);
            } while (layout[row][col] !== 0);

            const img = this.loadImage('/images/collectible.png');
            const itemName = `Key ${i + 1}`;        // give each collectible a name
            this.collectibles.push(
                new Collectible(img, col * 40, row * 40, itemName)
            );
        }
    }

    private setupPowerUps() {
        const layout = this.maze.getMazeLayout();

        // list out every PowerUp subclass you want to spawn
        const types = [
            ImmunityPowerUp,
            TimeReductionPowerUp,
            TimeIncreasePowerUp,
            ScoreBoostPowerUp,
            ShieldPowerUp,
            SpeedBoostPowerUp,
        ];

        // map each class name to its image path
        const imgPaths: Record<string, string> = {
            ImmunityPowerUp: '/images/reduction.png',
            TimeReductionPowerUp: '/images/reduction.png',
            TimeIncreasePowerUp: '/images/increase.png',
            ScoreBoostPowerUp: '/images/boost.png',
            ShieldPowerUp: '/images/shield.png',
            SpeedBoostPowerUp: '/images/speed.png',
        };

        const spawnCount = 6;  // how many you want out there

        for (let i = 0; i < spawnCount; i++) {
            let col: number, row: number;
            // find an empty cell, and avoid your player start (e.g. 1,1)
            do {
                col = Math.floor(Math.random() * layout[0].length);
                row = Math.floor(Math.random() * layout.length);
            } while (
                layout[row][col] !== 0 ||
                (col === 1 && row === 1)
                );

            // pick a type to spawn
            const Type = types[i % types.length];
            const img = this.loadImage(imgPaths[Type.name]);
            this.powerUps.push(new Type(img, col * 40, row * 40));
        }
    }

    loadImage(path: string): HTMLImageElement {
        const img = new Image();
        img.src = path;
        return img;
    }

    private onKeyDown(e: KeyboardEvent) {
        this.player.handleKeyDown(e);
    }

    private onKeyUp(e: KeyboardEvent) {
        this.player.handleKeyUp(e);
    }

    private gameLoop() {
        this.clockTicks++;
        if (!this.collisionEnabled && this.timeRemaining < 57) {
            this.collisionEnabled = true;
        }
        if (this.clockTicks % 10 === 0) {
            if (this.timeRemaining > 0) {
                this.timeRemaining--;
                for (const en of this.enemies) {
                    en.update(this, this.collisionEnabled);
                }
                this.checkEnemyCollisions();
                this.checkCollisions();
            } else {
                this.endGame("Time's up.");
            }
        }
        this.player.update(this, this.collisionEnabled);
        this.checkPowerUpCollisions();
        this.checkCollectibleCollisions();
        this.statusLabel.textContent = this.getStatusText();
        this.render();
    }

    private checkPowerUpCollisions() {
        for (const pu of this.powerUps) {
            if (pu.active && this.rectsIntersect(pu.getBounds(), this.player.getBounds())) {
                pu.applyEffect(this.player, this);
                pu.active = false;
                this.player.addScore(20);
                this.player.stats.incrementPowerUpsUsed();
            }
        }
    }

    private checkCollectibleCollisions() {
        for (const c of this.collectibles) {
            if (c.active && this.rectsIntersect(c.getBounds(), this.player.getBounds())) {
                this.player.getInventory().addItem(c.itemName);
                c.active = false;
                this.player.addScore(50);
            }
        }
    }

    private checkEnemyCollisions() {
        const nearThreshold = 20;
        const pRect = this.player.getBounds();
        for (const enemy of this.enemies) {
            if (!enemy.active) continue;
            const eRect = enemy.getBounds();
            // Near-death detection
            if (Math.abs(pRect.x - eRect.x) < nearThreshold && Math.abs(pRect.y - eRect.y) < nearThreshold && !this.rectsIntersect(eRect, pRect)) {
                this.player.stats.recordNearDeath();
            }
            // Actual collision
            if (this.rectsIntersect(eRect, pRect)) {
                if (this.player.isShielded()) {
                    enemy.active = false;
                    this.player.stats.incrementEnemiesDefeated();
                } else {
                    this.endGame('Hit by an enemy.');
                }
                break;
            }
        }
    }


    private rectsIntersect(a: DOMRect, b: DOMRect): boolean {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    private checkCollisions() {
        const r1 = this.exit.getBounds();
        const r2 = this.player.getBounds();
        if (
            r1.x < r2.x + r2.width &&
            r1.x + r1.width > r2.x &&
            r1.y < r2.y + r2.height &&
            r1.y + r1.height > r2.y
        ) {
            this.endGame('You Win!');
        }
    }

    private endGame(msg: string) {
        clearInterval(this.timerId);
        if (msg === 'You Win!') {
            this.player.addScore(200);
            this.player.addScore(this.timeRemaining * 5);
            const completionTime = 60 - this.timeRemaining;
            this.player.stats.updateFastestCompletion(completionTime);
        }
        alert(`${msg}\nFinal Score: ${this.player.score}`);
        const name = prompt('Enter your name for the leaderboard:');
        if (name) {
            const lb = new Leaderboard();
            lb.addScore(name, this.player.score);
            lb.saveScores();
            alert(lb.getLeaderboard());
        }
        this.player.ach.checkAndUnlock(
            this.player.score,
            this.timeRemaining,
            this.player.powerUpsCollected
        );
        alert(this.player.ach.displayAchievements());
        alert(this.player.stats.displayStats());
    }



    private getStatusText(): string {
        const left = this.powerUps.filter(p => p.active).length;
        return `Time: ${this.timeRemaining} | Score: ${this.player.score} | Combo: x${this.player.combo} | Power-Ups Left: ${left}`;
    }

    private render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const row of this.maze.getWalls()) {
            for (const w of row) {
                if (w) w.draw(this.ctx);
            }
        }
        this.exit.draw(this.ctx);
        this.collectibles.forEach(c => c.active && c.draw(this.ctx));
        this.powerUps.forEach(p => p.active && p.draw(this.ctx));
        this.enemies.forEach(e => e.draw(this.ctx));
        this.player.draw(this.ctx);
    }
}
