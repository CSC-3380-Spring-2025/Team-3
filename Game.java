import java.util.ArrayList;
import java.util.List;

// Represents a game created by a user
class Game {
    private int gameId;
    private String title;
    private int clickCount;

    public Game(int gameId, String title, int clickCount) {
        this.gameId = gameId;
        this.title = title;
        this.clickCount = clickCount;
    }

    // Simulate a click on the game by incrementing its counter
    public void incrementClick() {
        clickCount++;
    }

    public int getGameId() {
        return gameId;
    }

    public String getTitle() {
        return title;
    }

    public int getClickCount() {
        return clickCount;
    }

    @Override
    public String toString() {
        return "Game ID: " + gameId + ", Title: " + title + ", Clicks: " + clickCount;
    }
}