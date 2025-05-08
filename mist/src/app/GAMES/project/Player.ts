import { Sprite } from './Sprite';
import { GamePanel } from './GamePanel';
import { Inventory } from './Inventory';
import { Achievements } from './Achievements';
import { StatsTracker } from './StatsTracker';

export class Player extends Sprite {
    dx = 0;
    dy = 0;
    private static readonly ACC = 0.5;
    private static readonly MAX = 6.0;
    shielded = false;
    immune = false;
    speedBoosted = false;
    shieldDur = 0;
    immuneDur = 0;
    speedDur = 0;
    score = 0;
    combo = 1;
    powerUpsCollected = 0;

    readonly inv = new Inventory();
    readonly ach = new Achievements();
    readonly stats = new StatsTracker();

    constructor(panel: GamePanel, private maze: any) {
        super(panel.loadImage('/images/avatar.png'), 50, 50);
        panel.canvas.tabIndex = 0;
        panel.canvas.addEventListener('keydown', e => this.handleKeyDown(e));
        panel.canvas.addEventListener('keyup', e => this.handleKeyUp(e));
    }

    handleKeyDown(e: KeyboardEvent) {
        switch (e.key) {
            case 'ArrowUp':
                this.dy = Math.max(this.dy - Player.ACC, -Player.MAX);
                break;
            case 'ArrowDown':
                this.dy = Math.min(this.dy + Player.ACC, Player.MAX);
                break;
            case 'ArrowLeft':
                this.dx = Math.max(this.dx - Player.ACC, -Player.MAX);
                break;
            case 'ArrowRight':
                this.dx = Math.min(this.dx + Player.ACC, Player.MAX);
                break;
        }
        this.maze.checkCollisionWithWalls(this);
    }

    handleKeyUp(e: KeyboardEvent) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') this.dy = 0;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') this.dx = 0;
    }

    update(panel: GamePanel, collisionEnabled: boolean) {
        this.x += this.dx;
        this.y += this.dy;
        this.maze.checkCollisionWithWalls(this);

        // Track distance traveled each tick
        this.stats.addDistance(Math.hypot(this.dx, this.dy));

        if (this.shielded && --this.shieldDur <= 0) this.deactivateShield();
        if (this.speedBoosted && --this.speedDur <= 0)
            this.deactivateSpeedBoost(panel);
        if (this.immune && --this.immuneDur <= 0) this.immune = false;
    }

    activateShield() {
        this.shielded = true;
        this.shieldDur = 300;
    }

    deactivateShield() {
        this.shielded = false;
        this.stats.addPowerUpActiveTime(this.shieldDur / 10);
    }

    isShielded(): boolean {
        return this.shielded;
    }

    activateSpeedBoost() {
        this.speedBoosted = true;
        this.speedDur = 300;
    }

    deactivateSpeedBoost(panel: GamePanel) {
        this.speedBoosted = false;
        this.stats.addPowerUpActiveTime(this.speedDur / 10);
    }

    activateImmunity() {
        this.immune = true;
        this.immuneDur = 150;
    }

    isImmune(): boolean {
        return this.immune;
    }

    getInventory(): Inventory {
        return this.inv;
    }

    getComboMultiplier(): number {
        return this.combo;
    }

    incrementComboMultiplier() {
        this.combo++;
    }

    addScore(v: number) {
        this.score += v;
    }

    useKey(): boolean {
        return this.inv.useItem('Key');
    }
}
