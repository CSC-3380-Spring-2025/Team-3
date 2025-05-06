import { Router } from 'express';
import LeaderboardController from './leaderboard.controller';

const router = Router();
const controller = new LeaderboardController();

router.post('/submit-score', controller.submitScore.bind(controller));

router.get('/all-scores', controller.getLeaderboard.bind(controller));

export default router;