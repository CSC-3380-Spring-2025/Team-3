import { Router, Request, Response } from "express";
import { getTopScores } from "./leaderboard.service";
import Controller from '@/utils/interfaces/controller.interface';

export default class LeaderboardController implements Controller {
  public path = "/leaderboard"; 
  public router: Router;

  constructor() {
    this.router = Router();
    this.router.get("/all-scores", this.getLeaderboard);
  }

  public async getLeaderboard(req: Request, res: Response): Promise<void> {
    const game_name = req.query.game_name as string;

    if (!game_name) {
      res.status(400).json({ error: "Missing game_name parameter" });
      return;
    }

    try {
      const scores = await getTopScores(game_name);
      res.status(200).json({ game_name, top_scores: scores });
    } catch (error) {
      res.status(500).json({ error: "Could not load leaderboard" });
    }
  }
}