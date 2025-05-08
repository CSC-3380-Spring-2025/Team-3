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
import java.util.Random;

public class Enemy extends Sprite {

    private enum B {
        CHASE, PATROL, TELEPORT
    }
    private B behavior;
    private Player player;
    private int[][] path;
    private int idx = 0, speed = 8, tpCooldown = 100, tpCount = 0;

    public Enemy(BufferedImage img, int x, int y,
            Player p, String type, int[][] patrolPath) {
        super(img, x, y);
        this.player = p;
        this.path = patrolPath;
        switch (type) {
            case "chaser":
                behavior = B.CHASE;
                break;
            case "patroller":
                behavior = B.PATROL;
                break;
            default:
                behavior = B.TELEPORT;
                break;
        }
    }

    @Override
    public void update(GamePanel panel, boolean collisionEnabled) {
        if (!collisionEnabled) {
            return;
        }

        if (behavior == B.TELEPORT) {
            if (++tpCount >= tpCooldown) {
                teleport(panel);
                tpCount = 0;
            }
        } else if (behavior == B.CHASE) {
            chase();
        } else {
            patrol();
        }
    }

    private void teleport(GamePanel p) {
        Random r = new Random();
        int[][] L = Maze.getMazeLayout();
        int c, rr;
        do {
            c = r.nextInt(L[0].length);
            rr = r.nextInt(L.length);
        } while (L[rr][c] != 0);
        x = c * 40;
        y = rr * 40;
    }

    private void chase() {
        int px = player.getX(), py = player.getY();
        if (x < px) {
            x += speed;
        } else if (x > px) {
            x -= speed;
        }
        if (y < py) {
            y += speed;
        } else if (y > py) {
            y -= speed;
        }
    }

    private void patrol() {
        if (path == null || path.length == 0) {
            return;
        }
        int tx = path[idx][0], ty = path[idx][1];
        if (x < tx) {
            x += speed;
        } else if (x > tx) {
            x -= speed;
        }
        if (y < ty) {
            y += speed;
        } else if (y > ty) {
            y -= speed;
        }
        if (Math.abs(x - tx) < speed && Math.abs(y - ty) < speed) {
            idx = (idx + 1) % path.length;
        }
    }
}
