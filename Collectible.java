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

public class Collectible extends Sprite {

    private String itemName;

    public Collectible(BufferedImage img, int x, int y) {
        super(img, x, y);
        this.itemName = "Key " + (int) (Math.random() * 1000);
    }

    @Override
    public void update(GamePanel p, boolean ce) {
    }

    public String getItemName() {
        return itemName;
    }
}
