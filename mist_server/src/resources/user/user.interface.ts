import { Document, Types } from "mongoose";

export default interface User extends Document {
  ID: string;
  username: string;
  name: string;
  email: string;
  password: string;
  role: string;
  games: Types.ObjectId[]; 
  isValidPassword(password: string): Promise<boolean>;
  

}
