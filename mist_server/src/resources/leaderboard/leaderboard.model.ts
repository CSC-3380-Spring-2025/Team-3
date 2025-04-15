import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema({
  player_name: { type: String, required: true },
  score: { type: Number, required: true },
  game_name: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model("Score", ScoreSchema);