public class GameStatistics {
    public static void main(String[] args) {
        // Create a sample user
        User user = new User(1, "JohnDoe");

        // Create some sample games and add them to the user's profile
        user.addGame(new Game(101, "Maze Game", 15));
        user.addGame(new Game(102, "Tetris", 23));
        user.addGame(new Game(103, "Memory Match", 9));

        // Simulate a click on a game (e.g., game with id 101)
        System.out.println("Simulating a click on Maze Game (Game ID: 101)...");
        for (Game game : user.getGamesCreated()) {
            if (game.getGameId() == 101) {
                game.incrementClick();
            }
        }

        // Display user game statistics
        System.out.println("\nUser Game Statistics for " + user.getUsername() + ":");
        for (Game game : user.getGamesCreated()) {
            System.out.println(game.toString());
        }
    }
}