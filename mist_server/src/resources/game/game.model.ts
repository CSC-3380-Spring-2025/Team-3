import { Schema, model } from "mongoose";
import Game from "./game.interface";

const GameSchema = new Schema<Game>(
  {
    title:     { type: String, required: true },
    gameType:  { type: String, required: true },
    data:      { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    gameID:    { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default model<Game>("Game", GameSchema);
