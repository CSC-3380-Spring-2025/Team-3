import { Document } from "mongoose";

export default interface Game extends Document 
{
    title: string;
    gameType: string; //tetris, memory, ..
    data: any;
}