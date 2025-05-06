import mongoose from 'mongoose';

const TournamentSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  gameName: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: String }],           // e.g. usernames
  createdAt: { type: Date, default: Date.now },
});

export const Tournament = mongoose.models.Tournament
  || mongoose.model('Tournament', TournamentSchema);