/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.mazegame;

/**
 *
 * @author lsuti
 */
import java.util.*;

public class Achievements {

    private final List<String> unlocked = new ArrayList<>();

    public void checkAndUnlock(int score, int timeRem, int pu) {
        if (score >= 100 && !unlocked.contains("High Scorer")) {
            unlock("High Scorer");
        }
        if (timeRem > 20 && !unlocked.contains("Time Keeper")) {
            unlock("Time Keeper");
        }
        if (pu >= 3 && !unlocked.contains("Power-Up Master")) {
            unlock("Power-Up Master");
        }
    }

    private void unlock(String a) {
        unlocked.add(a);
        System.out.println("Achievement Unlocked: " + a);
    }

    public List<String> getUnlockedAchievements() {
        return new ArrayList<>(unlocked);
    }

    public String displayAchievements() {
        if (unlocked.isEmpty()) {
            return "No Achievements Yet!";
        }
        StringBuilder sb = new StringBuilder("Achievements:\n");
        unlocked.forEach(a -> sb.append("- ").append(a).append("\n"));
        return sb.toString();
    }
}
