import { Document, Types } from "mongoose";

export default interface User extends Document {
  username: string;
  name: string;
  email: string;
  password: string;
  role: string;
  games: Types.ObjectId[];

  profilePic?: string;
  bio?: string;
  gamesCreated?: number;
  totalPlays?: number;

  slug: string;

  isValidPassword(password: string): Promise<boolean>;
}