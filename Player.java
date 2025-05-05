/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.mazegame;

/**
 *
 * @author lsuti
 */
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.image.BufferedImage;

public class Player extends Sprite {

    private double dx = 0, dy = 0;
    private static final double ACC = 0.5, MAX = 6.0;
    private boolean shielded = false, immune = false, speedBoosted = false;
    private int shieldDur = 0, speedDur = 0, immuneDur = 0;
    private int score = 0, combo = 1, powerUpsCollected = 0;
    private Maze maze;
    private StatsTracker stats;
    private Inventory inv;
    private Achievements ach;

    public Player(GamePanel p, Maze m) {
        super(p.loadImage("/images/avatar.png"), 50, 50);
        this.maze = m;
        this.stats = new StatsTracker();
        this.inv = new Inventory();
        this.ach = new Achievements();

        p.addKeyListener(new KeyAdapter() {
            public void keyPressed(KeyEvent e) {
                switch (e.getKeyCode()) {
                    case KeyEvent.VK_UP:
                        dy = Math.max(dy - ACC, -MAX);
                        break;
                    case KeyEvent.VK_DOWN:
                        dy = Math.min(dy + ACC, MAX);
                        break;
                    case KeyEvent.VK_LEFT:
                        dx = Math.max(dx - ACC, -MAX);
                        break;
                    case KeyEvent.VK_RIGHT:
                        dx = Math.min(dx + ACC, MAX);
                        break;
                }
                m.checkCollisionWithWalls(Player.this);
            }

            public void keyReleased(KeyEvent e) {
                switch (e.getKeyCode()) {
                    case KeyEvent.VK_UP:
                    case KeyEvent.VK_DOWN:
                        dy = 0;
                        break;
                    case KeyEvent.VK_LEFT:
                    case KeyEvent.VK_RIGHT:
                        dx = 0;
                        break;
                }
            }
        });
    }

    @Override
    public void update(GamePanel panel, boolean collisionEnabled) {
        double nx = x + dx, ny = y + dy;
        x = (int) nx;
        y = (int) ny;
        maze.checkCollisionWithWalls(this);

        // durations
        if (shielded && --shieldDur <= 0) {
            deactivateShield();
        }
        if (speedBoosted && --speedDur <= 0) {
            deactivateSpeedBoost(panel);
        }
        if (immune && --immuneDur <= 0) {
            immune = false;
        }

        stats.addDistance((int) Math.hypot(dx, dy));
    }

    public void keyPressed(KeyEvent e) {
    }  // handled via inner adapter

    public void keyReleased(KeyEvent e) {
    }

    // power-up effects
    public void activateShield() {
        shielded = true;
        shieldDur = 300;
    }

    public void deactivateShield() {
        shielded = false;
        stats.addPowerUpActiveTime(shieldDur / 10);
    }

    public boolean isShielded() {
        return shielded;
    }

    public void activateSpeedBoost() {
        speedBoosted = true;
        speedDur = 300;
    }

    public void deactivateSpeedBoost(GamePanel p) {
        speedBoosted = false;
        stats.addPowerUpActiveTime(speedDur / 10);
    }

    public void activateImmunity() {
        immune = true;
        immuneDur = 150;
    }

    public boolean isImmune() {
        return immune;
    }

    // score/combo/inventory
    public void addScore(int v) {
        score += v;
    }

    public int getScore() {
        return score;
    }

    public int getComboMultiplier() {
        return combo;
    }

    public void incrementComboMultiplier() {
        combo++;
    }

    public Inventory getInventory() {
        return inv;
    }

    public StatsTracker getStatsTracker() {
        return stats;
    }

    public Achievements getAchievements() {
        return ach;
    }

    public int getPowerUpsCollected() {
        return powerUpsCollected;
    }
}
