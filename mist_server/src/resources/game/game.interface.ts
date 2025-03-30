import { Document } from "mongoose";

export default interface Game extends Document 
{
    title: string; 
    player: string;
    sprite: string;
    gameObject: string;
    obstacle: string;
    border: string;
    enemy: string;
    bullets: string;
    background: string;
}