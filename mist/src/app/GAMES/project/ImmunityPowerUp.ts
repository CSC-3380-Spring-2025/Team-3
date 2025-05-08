import { PowerUp } from './PowerUp';
import { Player } from './Player';
import { GamePanel } from './GamePanel';

export class ImmunityPowerUp extends PowerUp {
    static readonly CHANCE = 0.05;

    update(panel: GamePanel, collisionEnabled: boolean) {
        // no movement
    }

    applyEffect(player: Player, panel: GamePanel) {
        if (!player.isImmune()) {
            player.activateImmunity();
        }
    }
}