/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.mazegame;

/**
 *
 * @author lsuti
 */
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.*;
import javax.imageio.ImageIO;

public class GamePanel extends JPanel implements ActionListener, KeyListener {

    private javax.swing.Timer timer;
    private Player player;
    private Maze maze;
    private java.util.List<Enemy> enemies;
    private java.util.List<Collectible> collectibles;
    private java.util.List<PowerUp> powerUps;
    private Sprite exit;
    private JLabel statusLabel;

    private int timeRemaining = 60;
    private boolean collisionEnabled = false;
    private int clockTicks = 0;

    public GamePanel() {
        setPreferredSize(new Dimension(800, 600));
        setBackground(Color.BLACK);
        setFocusable(true);
        addKeyListener(this);

        initGame();  // create player, maze, sprites, etc.

        // now player is non-null, so this call is safe:
        statusLabel = new JLabel(getStatusText());

        timer = new javax.swing.Timer(100, this);
        timer.start();
    }

    private void initGame() {
        maze = new Maze(this, player);          // walls + exit + enemies
        player = new Player(this, maze);
        enemies = maze.getEnemies();
        exit = maze.getExit();

        collectibles = new ArrayList<>();
        powerUps = new ArrayList<>();
        setupCollectibles();
        setupPowerUps();
    }

    public JLabel getStatusLabel() {
        return statusLabel;
    }

    private void setupCollectibles() {
        Random rnd = new Random();
        int[][] layout = Maze.getMazeLayout();
        for (int i = 0; i < 3; i++) {
            int col, row;
            do {
                col = rnd.nextInt(layout[0].length);
                row = rnd.nextInt(layout.length);
            } while (layout[row][col] != 0);
            Collectible c = new Collectible(loadImage("/images/collectible.png"),
                    col * 40, row * 40);
            collectibles.add(c);
        }
    }

    private void setupPowerUps() {
        Random rnd = new Random();
        int[][] layout = Maze.getMazeLayout();
        for (int i = 0; i < 5; i++) {
            int col, row;
            do {
                col = rnd.nextInt(layout[0].length);
                row = rnd.nextInt(layout.length);
            } while (layout[row][col] != 0);
            PowerUp p;
            switch (i) {
                case 0:
                    p = new TimeReductionPowerUp(loadImage("/images/reduction.png"), col * 40, row * 40);
                    break;
                case 1:
                    p = new TimeIncreasePowerUp(loadImage("/images/increase.png"), col * 40, row * 40);
                    break;
                case 2:
                    p = new ScoreBoostPowerUp(loadImage("/images/boost.png"), col * 40, row * 40);
                    break;
                case 3:
                    p = new ShieldPowerUp(loadImage("/images/shield.png"), col * 40, row * 40);
                    break;
                default:
                    if (rnd.nextDouble() < 0.05) {
                        p = new ImmunityPowerUp(loadImage("/images/reduction.png"), col * 40, row * 40);
                    } else {
                        p = new SpeedBoostPowerUp(loadImage("/images/speed.png"), col * 40, row * 40);
                    }
            }
            powerUps.add(p);
        }
    }

    public BufferedImage loadImage(String path) {
        try {
            return ImageIO.read(getClass().getResource(path));
        } catch (IOException | NullPointerException e) {
            System.err.println("Image not found: " + path);
            return null;
        }
    }

    private String getStatusText() {
        return String.format("Time: %d  | Score: %d  | Combo: x%d  | Power-Ups Left: %d",
                timeRemaining, player.getScore(), player.getComboMultiplier(),
                (int) powerUps.stream().filter(PowerUp::isActive).count());
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        Graphics2D g2 = (Graphics2D) g;
        // draw walls
        for (Wall[] row : maze.getWalls()) {
            for (Wall w : row) {
                if (w != null) {
                    w.draw(g2);
                }
            }
        }
        // exit
        exit.draw(g2);
        // collectibles
        for (Collectible c : collectibles) {
            if (c.isActive()) {
                c.draw(g2);
            }
        }
        // powerups
        for (PowerUp p : powerUps) {
            if (p.isActive()) {
                p.draw(g2);
            }
        }
        // enemies
        for (Enemy e : enemies) {
            e.draw(g2);
        }
        // player
        player.draw(g2);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        clockTicks++;
        if (!collisionEnabled && timeRemaining < 57) {
            collisionEnabled = true;
        }

        // tick every 10 → 1s
        if (clockTicks % 10 == 0) {
            if (timeRemaining > 0) {
                timeRemaining--;
                for (Enemy en : enemies) {
                    en.update(this, collisionEnabled);
                }
                checkCollisions();
            } else {
                endGame("Time's up.");
            }
        }
        player.update(this, collisionEnabled);
        statusLabel.setText(getStatusText());
        repaint();
    }

    private void checkCollisions() {
        // power-ups
        for (PowerUp p : new ArrayList<>(powerUps)) {
            if (p.isActive() && p.getBounds().intersects(player.getBounds())) {
                p.applyEffect(player, this);
                p.setActive(false);
                player.getStatsTracker().incrementPowerUpsUsed();
            }
        }
        // collectibles
        for (Collectible c : collectibles) {
            if (c.isActive() && c.getBounds().intersects(player.getBounds())) {
                player.getInventory().addItem(c.getItemName());
                c.setActive(false);
            }
        }
        // enemies
        for (Enemy en : new ArrayList<>(enemies)) {
            if (en.getBounds().intersects(player.getBounds())) {
                if (player.isShielded()) {
                    en.setActive(false);
                    player.getStatsTracker().incrementEnemiesDefeated();
                } else if (!player.isImmune()) {
                    player.getStatsTracker().recordDeathCause("Enemy Collision");
                    endGame("Hit by an enemy.");
                    return;
                }
            } else {
                // near-death?
                if (player.getBounds().intersection(en.getBounds()).isEmpty()
                        && Math.abs(player.getX() - en.getX()) < 20
                        && Math.abs(player.getY() - en.getY()) < 20) {
                    player.getStatsTracker().recordNearDeath();
                }
            }
        }
        // exit
        if (exit.getBounds().intersects(player.getBounds())) {
            if (player.getInventory().hasItem("Key 1")) {
                endGame("You Win!");
            } else {
                System.out.println("Need Key 1 to exit!");
            }
        }
    }

    private void endGame(String msg) {
        timer.stop();
        int timeBonus = timeRemaining * getTimeScoreRatio();
        player.addScore(timeBonus);
        if (msg.equals("You Win!")) {
            player.getStatsTracker().updateFastestCompletion(60 - timeRemaining);
        }

        JOptionPane.showMessageDialog(this,
                msg + "\nFinal Score: " + player.getScore(),
                "Game Over", JOptionPane.INFORMATION_MESSAGE);

        String name = JOptionPane.showInputDialog(this,
                "Enter name for leaderboard:");
        if (name != null && !name.isBlank()) {
            Leaderboard lb = new Leaderboard();
            lb.addScore(name, player.getScore());
            lb.saveScores();
            JOptionPane.showMessageDialog(this, lb.getLeaderboard());
        }
        // achievements & stats
        player.getAchievements().checkAndUnlock(
                player.getScore(), timeRemaining,
                player.getPowerUpsCollected());
        JOptionPane.showMessageDialog(this,
                player.getAchievements().displayAchievements(),
                "Achievements", JOptionPane.INFORMATION_MESSAGE);
        JOptionPane.showMessageDialog(this,
                player.getStatsTracker().displayStats(),
                "Statistics", JOptionPane.INFORMATION_MESSAGE);
        System.exit(0);
    }

    // KeyListener
    @Override
    public void keyPressed(KeyEvent e) {
        player.keyPressed(e);
    }

    @Override
    public void keyReleased(KeyEvent e) {
        player.keyReleased(e);
    }

    @Override
    public void keyTyped(KeyEvent e) {
    }

    // expose for power-ups needing ratio/base
    public int getTimeScoreRatio() {
        return 2;
    }

    public int getScoreBoostBase() {
        return 10;
    }

    public int getTimeRemaining() {
        return timeRemaining;
    }

    public void setTimeRemaining(int t) {
        timeRemaining = t;
    }

    public JLabel getStatusLabelObj() {
        return statusLabel;
    }
}
