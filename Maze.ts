// File: src/Maze.ts
import { GamePanel } from './GamePanel';
import { Wall } from './Wall';
import { Enemy } from './Enemy';
import { Player } from './Player';
import { Sprite } from './Sprite';

export class Maze {
    private walls!: (Wall | null)[][];
    private exit!: Sprite;
    private enemies: Enemy[] = [];
    private static readonly LAYOUT: number[][] = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
        [1,0,1,0,1,0,1,1,0,1,0,0,0,0,1,0,1,1,0,1],
        [1,0,1,0,0,0,0,1,0,1,1,1,1,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,0,1,1,1,0,0,0,0,0,0,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,0,0,0,1],
        [1,1,1,0,1,1,1,1,0,1,0,0,0,0,1,1,1,1,0,1],
        [1,0,0,0,1,0,0,0,0,1,0,1,1,1,1,0,0,0,0,1],
        [1,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0]
    ];

    constructor(panel: GamePanel) {
        this.generate(panel);
        this.setupExit(panel);
    }

    private generate(panel: GamePanel): void {
        const L = Maze.LAYOUT;
        this.walls = L.map((row, r) =>
            row.map((cell, c) =>
                cell === 1
                    ? new Wall(panel.loadImage('/images/wall.jpg'), c * 40, r * 40)
                    : null
            )
        );
    }

    private setupExit(panel: GamePanel): void {
        const img = panel.loadImage('/images/trophy.png');
        this.exit = new (class extends Sprite {
            constructor(img: HTMLImageElement, x: number, y: number) {
                super(img, x, y);
            }
            update(panel: GamePanel, collisionEnabled: boolean): void {}
        })(img, 19 * 40, 9 * 40);
    }

    public setupEnemies(panel: GamePanel, player: Player): void {
        const poses: [number, number][] = [
            [3, 5],
            [6, 1],
            [9, 2],
            [10, 2]
        ];
        const types = ['teleporter', 'patroller', 'chaser', 'chaser'];
        this.enemies = poses.map((pos, i) =>
            new Enemy(
                panel.loadImage('/images/ghostenemy.png'),
                pos[0] * 40,
                pos[1] * 40,
                player,
                types[i],
                types[i] === 'patroller' ? this.generatePatrol(pos) : undefined
            )
        );
    }

    private generatePatrol([c, r]: [number, number]): [number, number][] {
        return [
            [c * 40, r * 40],
            [c * 40 + 40, r * 40],
            [c * 40 + 40, r * 40 + 40],
            [c * 40, r * 40 + 40]
        ];
    }

    getMazeLayout(): number[][] {
        return Maze.LAYOUT;
    }

    getWalls(): (Wall | null)[][] {
        return this.walls;
    }

    getEnemies(): Enemy[] {
        return this.enemies;
    }

    getExit(): Sprite {
        return this.exit;
    }

    public checkCollisionWithWalls(player: Player): void {
        const pRect = player.getBounds();
        for (const row of this.walls) {
            for (const wall of row) {
                if (wall) {
                    const wRect = wall.getBounds();
                    // AABB overlap check
                    if (
                        wRect.x < pRect.x + pRect.width &&
                        wRect.x + wRect.width > pRect.x &&
                        wRect.y < pRect.y + pRect.height &&
                        wRect.y + wRect.height > pRect.y
                    ) {
                        // Calculate overlaps
                        const overlapLeft = (pRect.x + pRect.width) - wRect.x;
                        const overlapRight = (wRect.x + wRect.width) - pRect.x;
                        const overlapTop = (pRect.y + pRect.height) - wRect.y;
                        const overlapBottom = (wRect.y + wRect.height) - pRect.y;
                        // Resolve the smallest overlap
                        if (
                            overlapLeft < overlapRight &&
                            overlapLeft < overlapTop &&
                            overlapLeft < overlapBottom
                        ) {
                            player.x = wRect.x - pRect.width;
                        } else if (
                            overlapRight < overlapLeft &&
                            overlapRight < overlapTop &&
                            overlapRight < overlapBottom
                        ) {
                            player.x = wRect.x + wRect.width;
                        } else if (overlapTop < overlapBottom) {
                            player.y = wRect.y - pRect.height;
                        } else {
                            player.y = wRect.y + wRect.height;
                        }
                        // Update bounding rect after move
                        pRect.x = player.x;
                        pRect.y = player.y;
                    }
                }
            }
        }
    }
}
