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

public class TimeReductionPowerUp extends PowerUp {

    private static final int AMT = 10;

    public TimeReductionPowerUp(BufferedImage img, int x, int y) {
        super(img, x, y);
    }

    @Override
    public void update(GamePanel p, boolean ce) {
    }

    @Override
    public void applyEffect(Player player, GamePanel p) {
        p.setTimeRemaining(Math.max(0, p.getTimeRemaining() - AMT));
    }
}
