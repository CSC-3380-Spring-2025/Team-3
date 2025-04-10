import { Router } from "express";
import { submitScore, leaderboard } from "./leaderboard.controller";

const router = Router();

router.post("/score", submitScore);
router.get("/leaderboard", leaderboard);

export default router;