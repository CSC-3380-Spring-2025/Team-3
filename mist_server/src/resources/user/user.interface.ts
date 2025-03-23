import { Document, Types } from "mongoose";

export default interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  games: Types.ObjectId[]; 
  isValidPassword(password: string): Promise<boolean>;
}
