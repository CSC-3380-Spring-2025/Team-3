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

public class Inventory {

    private final Map<String, Integer> items = new HashMap<>();

    public void addItem(String name) {
        items.put(name, items.getOrDefault(name, 0) + 1);
    }

    public boolean useItem(String name) {
        if (items.containsKey(name) && items.get(name) > 0) {
            items.put(name, items.get(name) - 1);
            if (items.get(name) == 0) {
                items.remove(name);
            }
            return true;
        }
        return false;
    }

    public boolean hasItem(String name) {
        return items.getOrDefault(name, 0) > 0;
    }

    public String displayInventory() {
        if (items.isEmpty()) {
            return "Inventory Empty";
        }
        StringBuilder sb = new StringBuilder("Inventory:\n");
        items.forEach((k, v) -> sb.append(k).append(": ").append(v).append("\n"));
        return sb.toString();
    }
}
