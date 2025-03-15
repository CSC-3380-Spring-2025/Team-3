import { Schema, model} from 'mongoose';
import Game from '@/resources/game/game.interface';

const GameSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },

        body: {
            type: String,
            required: true
        },

    },
    {timestamps: true}
)

export default model<Game>('Game', GameSchema)