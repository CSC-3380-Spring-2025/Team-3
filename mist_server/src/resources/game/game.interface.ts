import { Document } from "mongoose";

export default interface Game extends Document 
{
    title: string; 
    player: undefined;
    sprite: undefined;
    gameObject: undefined;
    obstacle: undefined;
    border: undefined;
    enemy: undefined;
    bullets: undefined;
    background: undefined;
    weapon: undefined;
    score: number;
    nameTag: string;
    healthBar: undefined;
    itemDescription: string;
    menu: string;
    damageNum: number;
    leaderboardStats: number;
}