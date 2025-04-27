/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.mazegame;

/**
 *
 * @author lsuti
 */
import java.io.*;

import java.util.*;

public class Leaderboard {

    private static final String FILE = "leaderboard.txt";
    private final List<String> scores = new ArrayList<>();

    public Leaderboard() {
        loadScores();
    }

    private void loadScores() {
        try (BufferedReader br = new BufferedReader(new FileReader(FILE))) {
            String l;
            while ((l = br.readLine()) != null) {
                scores.add(l);
            }
        } catch (IOException e) {
        }
    }

    public void saveScores() {
        try (PrintWriter pw = new PrintWriter(new FileWriter(FILE))) {
            scores.forEach(pw::println);
        } catch (IOException e) {
            System.err.println(e);
        }
    }

    public void addScore(String name, int s) {
        scores.add(name + " - " + s);
        scores.sort((a, b) -> Integer.compare(
                Integer.parseInt(b.split(" - ")[1]),
                Integer.parseInt(a.split(" - ")[1])
        ));
        if (scores.size() > 10) {
            scores.remove(scores.size() - 1);
        }
    }

    public String getLeaderboard() {
        StringBuilder sb = new StringBuilder("Leaderboard:\n");
        for (int i = 0; i < scores.size(); i++) {
            sb.append(i + 1).append(". ").append(scores.get(i)).append("\n");
        }
        return sb.toString();
    }
}
