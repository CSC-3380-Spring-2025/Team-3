import { PowerUp } from './PowerUp';
import { Player } from './Player';
import { GamePanel } from './GamePanel';

export class TimeReductionPowerUp extends PowerUp {
    private static readonly AMOUNT = 10;

    update(panel: GamePanel, collisionEnabled: boolean): void {
        // no movement
    }

    applyEffect(player: Player, panel: GamePanel): void {
        panel.timeRemaining = Math.max(
            0,
            panel.timeRemaining - TimeReductionPowerUp.AMOUNT
        );
    }
}