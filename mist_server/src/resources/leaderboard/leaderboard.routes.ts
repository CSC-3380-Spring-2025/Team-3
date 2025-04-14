import express, { Router, Request, Response } from "express";
import { submitScore, leaderboard } from "./leaderboard.controller";
import ScoreModel from "./leaderboard.model";

const router: Router = express.Router();

router.post("/score", submitScore);

router.get("/leaderboard", leaderboard);

router.get("/all-scores", function (req: Request, res: Response): express.Response<any, Record<string, any>> | undefined {
        const game_name = req.query.game_name as string;

        if (!game_name) {
            return res.status(400).json({ error: "Missing game_name query parameter" });
        }

        ScoreModel.find({ game_name })
            .sort({ score: -1 })
            .lean()
            .then((scores) => {
                res.status(200).json(scores);
            })
            .catch((err) => {
                console.error("Error fetching all scores:", err);
                res.status(500).json({ error: "Failed to retrieve scores" });
            });
    });

export default router;