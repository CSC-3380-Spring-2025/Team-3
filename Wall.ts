import { Sprite } from './Sprite';
import { GamePanel } from './GamePanel';

export class Wall extends Sprite {
    constructor(img: HTMLImageElement, x: number, y: number) {
        super(img, x, y);
    }
    update(panel: GamePanel, collisionEnabled: boolean) {}
}