import ScoreModel from "./leaderboard.model";

export async function insertScore(score: {
  player_name: string;
  score: number;
  game_name: string;
}) {
  const newScore = new ScoreModel(score);
  await newScore.save();
}

export async function getTopScores(game_name: string) {
  return await ScoreModel.find({ game_name })
    .sort({ score: -1 })
    .limit(10)
    .lean();
}