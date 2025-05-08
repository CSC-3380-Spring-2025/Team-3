import { Document, Types } from "mongoose";

export default interface Game extends Document {
  title:     string;
  gameType:  string;
  data:      string;        // Base64 payload
  createdBy: Types.ObjectId;
  gameID:    string;
  createdAt: Date;
  updatedAt: Date;
}
