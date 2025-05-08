import { Sprite } from './Sprite';
import { Player } from './Player';
import { GamePanel } from './GamePanel';

export abstract class PowerUp extends Sprite {
    constructor(img: HTMLImageElement, x: number, y: number) {
        super(img, x, y);
    }
    abstract applyEffect(player: Player, panel: GamePanel): void;
}