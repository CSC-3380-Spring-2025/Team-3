import { Request, Response } from "express";
import { insertScore, getTopScores } from "./leaderboard.service";

export const submitScore = async (req: Request, res: Response): Promise<void> => {
  const { player_name, score, game_name } = req.body;

  if (!player_name || !score || !game_name) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  await insertScore({ player_name, score, game_name });
  res.status(200).json({ message: "Score submitted!" });
};

export const leaderboard = async (req: Request, res: Response): Promise<void> => {
  const game_name = req.query.game_name as string;

  if (!game_name) {
    res.status(400).json({ error: "Missing game_name parameter" });
    return;
  }

  const scores = await getTopScores(game_name);
  res.status(200).json({ game_name, top_scores: scores });
};