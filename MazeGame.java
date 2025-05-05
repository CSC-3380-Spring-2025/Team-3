/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.mazegame;

/**
 *
 * @author lsuti
 */
import javax.swing.*;
import java.awt.*;

public class MazeGame {

    public static void main(String[] args) {
        System.out.println(">>> MazeGame.main() entered");
        SwingUtilities.invokeLater(() -> {
            System.out.println(">>> Inside invokeLater");
            JFrame frame = new JFrame("Maze Game");
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.setLayout(new BorderLayout());

            GamePanel panel = new GamePanel();
            frame.add(panel, BorderLayout.CENTER);
            frame.add(panel.getStatusLabel(), BorderLayout.SOUTH);

            frame.pack();
            frame.setLocationRelativeTo(null);
            frame.setVisible(true);
        });
    }
}
