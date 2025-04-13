import { Schema, model} from 'mongoose';
import Game from '@/resources/game/game.interface';
import { number } from 'joi';

const GameSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },

        sprite: {
            type: String,
            required: true
        },

        player: {
            type: String,
            required: true
        },

        gameObject: {
            type: String,
            required: false
        },

        obstacle: {
            type: String,
            required: false
        },

        border: {
            type: String,
            required: false
        },

        enemy: {
            type: String,
            required: false
        },

        bullets: {
            type: String,
            required: false
        },

        background: {
            type: String,
            required: false
        },

        weapon: {
            type: undefined,
            required: false
        },

        score: {
            type: number,
            required: false
        },

        nameTag: {
            type: String,
            required: false
        },

        healthBar: {
            type: undefined,
            required: false
        },

        itemDescription: {
            type: String,
            required: false
        },

        menu: {
            type: String,
            required: false
        },

        damageNum: {
            type: number,
            required: false
        },

        leaderboardStats: {
            type: number,
            required: true
        }

    },
    {timestamps: true}
)

export default model<Game>('Game', GameSchema)