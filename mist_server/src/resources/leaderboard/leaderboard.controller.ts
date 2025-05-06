import { Router, Request, Response } from 'express';
import { insertScore, getTopScores } from './leaderboard.service';

export default class LeaderboardController {
  public readonly path = '/api/leaderboard';
  public readonly router: Router;

  constructor() {
    this.router = Router();

    this.router.post('/submit-score', this.submitScore);
    this.router.get('/all-scores', this.getLeaderboard);
  }

  /** Submit a new score */
  private async submitScore(req: Request, res: Response): Promise<void> {
    const { player_name, score, game_name } = req.body;

    if (!player_name || score == null || !game_name) {
      res.status(400).json({ error: 'Missing required fields: player_name, score, game_name' });
      return;
    }

    try {
      await insertScore({ player_name, score, game_name });
      res.status(200).json({ message: 'Score submitted!' });
    } catch (error) {
      console.error('[Leaderboard] Error submitting score:', error);
      res.status(500).json({ error: 'Could not submit score' });
    }
  }

  /** Retrieve top scores for a given game */
  public async getLeaderboard(req: Request, res: Response): Promise<void> {
    const game_name = req.query.game_name as string;

    if (!game_name) {
      res.status(400).json({ error: 'Missing game_name parameter' });
      return;
    }

    try {
      const scores = await getTopScores(game_name);
      res.status(200).json({ game_name, top_scores: scores });
    } catch (error) {
      console.error('[Leaderboard] Error fetching leaderboard:', error);
      res.status(500).json({ error: 'Could not load leaderboard' });
    }
  }

  
}