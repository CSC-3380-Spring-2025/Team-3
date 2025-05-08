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

public abstract class PowerUp extends Sprite {

    public PowerUp(BufferedImage img, int x, int y) {
        super(img, x, y);
    }

    public abstract void applyEffect(Player player, GamePanel panel);
}
