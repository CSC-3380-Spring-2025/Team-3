import { Document, Types } from 'mongoose';

export type UserDocument = Document & {
  ID:       string;
  username: string;
  slug?:    string;
  name:     string;
  email:    string;
  password: string;
  role:     string;
  games:    Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;


  isValidPassword(password: string): Promise<boolean>;
};