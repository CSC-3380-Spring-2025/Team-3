import { GamePanel } from './GamePanel';

export abstract class Sprite {
    x: number;
    y: number;
    image: HTMLImageElement;
    active: boolean = true;

    constructor(img: HTMLImageElement, x: number, y: number) {
        this.image = img;
        this.x = x;
        this.y = y;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        if (this.active && this.image.complete) {
            // draw at the image's natural size
            ctx.drawImage(this.image, this.x, this.y);
        }
    }

    abstract update(panel: GamePanel, collisionEnabled: boolean): void;

    getBounds(): DOMRect {
        // use the actual image dimensions for collisions
        const w = this.image.naturalWidth;
        const h = this.image.naturalHeight;
        return new DOMRect(this.x, this.y, w, h);
    }
}