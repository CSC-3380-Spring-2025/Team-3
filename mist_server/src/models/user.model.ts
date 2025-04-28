// src/models/user.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: "" },
  bio: { type: String, default: "" },
  gamesCreated: { type: Number, default: 0 },
  totalPlays: { type: Number, default: 0 },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
