import { PowerUp } from './PowerUp';
import { Player } from './Player';
import { GamePanel } from './GamePanel';

export class ShieldPowerUp extends PowerUp {
    update(panel: GamePanel, collisionEnabled: boolean) {
        // no movement
    }

    applyEffect(player: Player, panel: GamePanel) {
        if (!player.isShielded()) {
            player.activateShield();
        }
    }
}
