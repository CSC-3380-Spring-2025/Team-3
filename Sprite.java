/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.mazegame;

/**
 *
 * @author lsuti
 */
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.image.BufferedImage;

public abstract class Sprite {

    protected int x, y;
    protected BufferedImage image;
    protected boolean active = true;
    protected int width, height;

    public Sprite(BufferedImage img, int x, int y) {
        this.image = img;
        this.x = x;
        this.y = y;
        if (img != null) {
            this.width = img.getWidth();
            this.height = img.getHeight();
        }
    }

    public void draw(Graphics2D g) {
        if (active && image != null) {
            g.drawImage(image, x, y, null);
        }
    }

    /**
     * Update your internal state each tick.
     */
    public abstract void update(GamePanel panel, boolean collisionEnabled);

    public Rectangle getBounds() {
        return new Rectangle(x, y, width, height);
    }

    // getters/setters
    public boolean isActive() {
        return active;
    }

    public void setActive(boolean a) {
        this.active = a;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }
}
