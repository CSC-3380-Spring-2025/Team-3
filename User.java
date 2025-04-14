import java.util.ArrayList;
import java.util.List;

// Represents a user with a list of games they've created
class User {
    private int userId;
    private String username;
    private List<Game> gamesCreated;

    public User(int userId, String username) {
        this.userId = userId;
        this.username = username;
        this.gamesCreated = new ArrayList<>();
    }

    // Add a game to the user's created games list
    public void addGame(Game game) {
        gamesCreated.add(game);
    }

    public List<Game> getGamesCreated() {
        return gamesCreated;
    }

    public String getUsername() {
        return username;
    }
}


