import { Schema, model} from 'mongoose';
import Game from '@/resources/game/game.interface';

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
        }
    },
    {timestamps: true}
)

export default model<Game>('Game', GameSchema)