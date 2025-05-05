/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.mazegame;

/**
 *
 * @author lsuti
 */
import java.awt.Rectangle;
import java.awt.image.BufferedImage;
import java.util.*;

public class Maze {

    private Wall[][] walls;
    private Sprite exit;
    private java.util.List<Enemy> enemies = new ArrayList<>();
    private static final int[][] LAYOUT = {
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        {1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1},
        {1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1},
        {1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1},
        {1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1},
        {1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1},
        {1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1},
        {1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1},
        {1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1},
        {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0}
    };

    public Maze(GamePanel panel, Player player) {
        generate(panel);
        setupExit(panel);
        setupEnemies(panel, player);
    }

    private void generate(GamePanel p) {
        walls = new Wall[LAYOUT.length][LAYOUT[0].length];
        for (int r = 0; r < LAYOUT.length; r++) {
            for (int c = 0; c < LAYOUT[r].length; c++) {
                if (LAYOUT[r][c] == 1) {
                    walls[r][c] = new Wall(
                            p.loadImage("/images/wall.jpg"),
                            c * 40, r * 40
                    );
                }
            }
        }
    }

    private void setupExit(GamePanel p) {
        BufferedImage img = p.loadImage("/images/trophy.png");
        exit = new Sprite(img, 19 * 40, 9 * 40) {
            @Override
            public void update(GamePanel panel, boolean ce) {
            }
        };
    }

    private void setupEnemies(GamePanel p, Player pl) {
        // example positions
        int[][] poses = {{3, 5}, {6, 1}, {9, 2}, {10, 2}};
        String[] types = {"teleporter", "patroller", "chaser", "chaser"};
        for (int i = 0; i < poses.length; i++) {
            Enemy e = new Enemy(
                    p.loadImage("/images/ghostenemy.png"),
                    poses[i][0] * 40, poses[i][1] * 40,
                    pl, types[i],
                    (types[i].equals("patroller") ? generatePatrol(poses[i]) : null)
            );
            enemies.add(e);
        }
    }

    private int[][] generatePatrol(int[] pos) {
        int c = pos[0] * 40, r = pos[1] * 40;
        return new int[][]{{c, r}, {c + 40, r}, {c + 40, r + 40}, {c, r + 40}};
    }

    public static int[][] getMazeLayout() {
        return LAYOUT;
    }

    public Wall[][] getWalls() {
        return walls;
    }

    public java.util.List<Enemy> getEnemies() {
        return enemies;
    }

    public Sprite getExit() {
        return exit;
    }

    // ← NEW: collision detection
    public void checkCollisionWithWalls(Player player) {
        for (Wall[] row : walls) {
            for (Wall wall : row) {
                if (wall != null && player.getBounds().intersects(wall.getBounds())) {
                    adjustPlayerPosition(player, wall);
                }
            }
        }
    }

    // ← NEW: push the player out of walls
    private void adjustPlayerPosition(Player player, Wall wall) {
        Rectangle pb = player.getBounds();
        Rectangle wb = wall.getBounds();

        double overlapLeft = pb.getMaxX() - wb.getMinX();
        double overlapRight = wb.getMaxX() - pb.getMinX();
        double overlapTop = pb.getMaxY() - wb.getMinY();
        double overlapBottom = wb.getMaxY() - pb.getMinY();

        if (overlapLeft < overlapRight
                && overlapLeft < overlapTop
                && overlapLeft < overlapBottom) {
            player.setX((int) (wb.getMinX() - pb.getWidth()));
        } else if (overlapRight < overlapLeft
                && overlapRight < overlapTop
                && overlapRight < overlapBottom) {
            player.setX((int) wb.getMaxX());
        } else if (overlapTop < overlapBottom) {
            player.setY((int) (wb.getMinY() - pb.getHeight()));
        } else {
            player.setY((int) wb.getMaxY());
        }
    }
}
