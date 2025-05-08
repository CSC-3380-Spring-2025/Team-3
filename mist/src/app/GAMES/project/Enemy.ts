import { Sprite } from './Sprite';
import { Player } from './Player';
import { GamePanel } from './GamePanel';

enum Behavior { TELEPORT = 'teleporter', PATROL = 'patroller', CHASE = 'chaser' }

export class Enemy extends Sprite {
    private behavior: Behavior;
    private player: Player;
    private patrolPath?: [number, number][];
    private idx = 0;
    private speed = 8;
    private teleportCooldown = 100;
    private teleportCounter = 0;

    constructor(
        img: HTMLImageElement,
        x: number,
        y: number,
        player: Player,
        type: string,
        patrolPath?: [number, number][]
    ) {
        super(img, x, y);
        this.player = player;
        this.patrolPath = patrolPath;
        this.behavior = type as Behavior;
    }

    update(panel: GamePanel, collisionEnabled: boolean) {
        if (!collisionEnabled) return;
        if (this.behavior === Behavior.TELEPORT) {
            this.teleportCounter++;
            if (this.teleportCounter >= this.teleportCooldown) {
                this.teleport(panel);
                this.teleportCounter = 0;
            }
            return;
        }
        if (this.behavior === Behavior.CHASE) this.chase();
        else if (this.behavior === Behavior.PATROL) this.patrol();
    }

    private teleport(panel: GamePanel) {
        const L = panel.maze.getMazeLayout();
        let c: number, r: number;
        do {
            c = Math.floor(Math.random() * L[0].length);
            r = Math.floor(Math.random() * L.length);
        } while (L[r][c] !== 0);
        this.x = c * 40;
        this.y = r * 40;
    }

    private chase() {
        if (this.x < this.player.x) this.x += this.speed;
        else if (this.x > this.player.x) this.x -= this.speed;
        if (this.y < this.player.y) this.y += this.speed;
        else if (this.y > this.player.y) this.y -= this.speed;
    }

    private patrol() {
        if (!this.patrolPath) return;
        const [tx, ty] = this.patrolPath[this.idx];
        if (this.x < tx) this.x += this.speed;
        else if (this.x > tx) this.x -= this.speed;
        if (this.y < ty) this.y += this.speed;
        else if (this.y > ty) this.y -= this.speed;
        if (
            Math.abs(this.x - tx) < this.speed &&
            Math.abs(this.y - ty) < this.speed
        ) {
            this.idx = (this.idx + 1) % this.patrolPath.length;
        }
    }
}