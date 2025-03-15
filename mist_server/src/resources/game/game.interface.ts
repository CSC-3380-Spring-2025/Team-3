import { Document } from "mongoose";

export default interface Game extends Document {
    title: string; 
    body: string;

}