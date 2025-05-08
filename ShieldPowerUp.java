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

public class ShieldPowerUp extends PowerUp {

    public ShieldPowerUp(BufferedImage img, int x, int y) {
        super(img, x, y);
    }

    @Override
    public void update(GamePanel p, boolean ce) {
    }

    @Override
    public void applyEffect(Player player, GamePanel p) {
        if (!player.isShielded()) {
            player.activateShield();
        }
    }
}
