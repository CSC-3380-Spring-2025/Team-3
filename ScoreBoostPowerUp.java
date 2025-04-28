/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.mazegame;

/**
 *
 * @author lsuti
 */
import java.awt.image.BufferedImage;

public class ScoreBoostPowerUp extends PowerUp {

    private static final int MAX_MULTIPLIER = 5;
    private static final int DURATION = 100;
    private static boolean multiplierActive = false;
    private static int currentMultiplier = 1;
    private static int multiplierTimeRemaining = 0;

    public ScoreBoostPowerUp(BufferedImage img, int x, int y) {
        super(img, x, y);
    }

    @Override
    public void update(GamePanel panel, boolean collisionEnabled) {
        if (multiplierActive) {
            multiplierTimeRemaining--;
            if (multiplierTimeRemaining <= 0) {
                currentMultiplier = 1;
                multiplierActive = false;
            }
        }
    }

    @Override
    public void applyEffect(Player player, GamePanel panel) {
        // Reset duration if already active
        if (multiplierActive) {
            multiplierTimeRemaining = DURATION;
        }

        // Calculate bonus using the player's combo multiplier
        int bonusScore = player.getComboMultiplier()
                * panel.getScoreBoostBase()
                * currentMultiplier;
        player.addScore(bonusScore);

        // Increase our internal multiplier up to the max
        if (currentMultiplier < MAX_MULTIPLIER) {
            currentMultiplier++;
        }
        multiplierActive = true;
        multiplierTimeRemaining = DURATION;

        // Add a time bonus based on the score boost
        int timeBonus = bonusScore / panel.getTimeScoreRatio();
        panel.setTimeRemaining(panel.getTimeRemaining() + timeBonus);

        // Advance the player's combo and record the power‐up use
        player.incrementComboMultiplier();
        player.getStatsTracker().incrementPowerUpsUsed();
    }
}
