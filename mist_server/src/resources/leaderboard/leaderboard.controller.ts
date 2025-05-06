import { Router, Request, Response } from 'express';
import { insertScore, getTopScores } from './leaderboard.service';

export default class LeaderboardController {
  public path = '/api/leaderboard';
  public router = Router();

  constructor() {
    // Route for submitting a new score
    this.router.post('/submit-score', this.submitScore.bind(this));
    // Route for retrieving top scores by game
    this.router.get('/all-scores', this.getLeaderboard.bind(this));
  }

  // Changed to public so router can access it
  public async submitScore(req: Request, res: Response): Promise<void> {
    const { player_name, score, game_name } = req.body;

    if (!player_name || score == null || !game_name) {
      res.status(400).json({ error: 'Missing required fields: player_name, score, game_name' });
      return;
    }

    try {
      await insertScore({ player_name, score, game_name });
      res.status(200).json({ message: 'Score submitted!' });
    } catch (error) {
      console.error('Error submitting score:', error);
      res.status(500).json({ error: 'Could not submit score' });
    }
  }

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
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ error: 'Could not load leaderboard' });
    }
  }
}
