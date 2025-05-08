import { PowerUp } from './PowerUp';
import { Player } from './Player';
import { GamePanel } from './GamePanel';

export class ScoreBoostPowerUp extends PowerUp {
    private static readonly MAX_MULTIPLIER = 5;
    private static readonly DURATION = 100;
    private static multiplierActive = false;
    private static currentMultiplier = 1;
    private static multiplierTimeRemaining = 0;

    update(panel: GamePanel, collisionEnabled: boolean): void {
        if (ScoreBoostPowerUp.multiplierActive) {
            ScoreBoostPowerUp.multiplierTimeRemaining--;
            if (ScoreBoostPowerUp.multiplierTimeRemaining <= 0) {
                ScoreBoostPowerUp.currentMultiplier = 1;
                ScoreBoostPowerUp.multiplierActive = false;
            }
        }
    }

    applyEffect(player: Player, panel: GamePanel): void {
        // Activate and reset the multiplier timer
        ScoreBoostPowerUp.multiplierActive = true;
        ScoreBoostPowerUp.multiplierTimeRemaining = ScoreBoostPowerUp.DURATION;

        // Compute bonus: combo * base score * current multiplier
        const bonus =
            player.combo *
            panel.scoreBoostBase *
            ScoreBoostPowerUp.currentMultiplier;
        player.addScore(bonus);

        // Bump multiplier for next use (capped)
        if (ScoreBoostPowerUp.currentMultiplier < ScoreBoostPowerUp.MAX_MULTIPLIER) {
            ScoreBoostPowerUp.currentMultiplier++;
        }

        // Convert part of that bonus into extra time
        const timeBonus = bonus / panel.timeScoreRatio;
        panel.timeRemaining += timeBonus;

        // Update player state
        player.incrementComboMultiplier();
        player.stats.incrementPowerUpsUsed();
    }
}