import { Sprite } from './Sprite';
import { GamePanel } from './GamePanel';

export class Collectible extends Sprite {
    public itemName: string;

    constructor(img: HTMLImageElement, x: number, y: number, itemName: string) {
        super(img, x, y);
        this.itemName = itemName;
    }

    // No movement for collectibles
    update(panel: GamePanel, collisionEnabled: boolean): void {}

    getItemName(): string {
        return this.itemName;
    }
}
