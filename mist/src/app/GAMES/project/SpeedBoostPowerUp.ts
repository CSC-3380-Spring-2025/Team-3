import { PowerUp } from './PowerUp';
import { Player } from './Player';
import { GamePanel } from './GamePanel';

export class SpeedBoostPowerUp extends PowerUp {
    update(panel: GamePanel, collisionEnabled: boolean) {
        // no movement
    }

    applyEffect(player: Player, panel: GamePanel) {
        player.activateSpeedBoost();
    }
}