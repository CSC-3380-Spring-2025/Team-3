import { open } from "sqlite";
const sqlite3 = require("sqlite3");
import { Score } from "./leaderboard.model";

const dbPromise = open({
  filename: "./scores.db",
  driver: sqlite3.Database,
});

export async function initLeaderboardDB() {
  const db = await dbPromise;
  await db.run(`
    CREATE TABLE IF NOT EXISTS scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      player_name TEXT NOT NULL,
      score INTEGER NOT NULL,
      game_name TEXT NOT NULL
    );
  `);
}

export async function insertScore(score: Score) {
  const db = await dbPromise;
  await db.run(
    "INSERT INTO scores (player_name, score, game_name) VALUES (?, ?, ?)",
    score.player_name,
    score.score,
    score.game_name
  );
}

export async function getTopScores(game_name: string) {
  const db = await dbPromise;
  return await db.all(
    "SELECT player_name, score FROM scores WHERE game_name = ? ORDER BY score DESC LIMIT 10",
    game_name
  );
}