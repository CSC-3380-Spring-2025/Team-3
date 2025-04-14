import { Schema, model} from 'mongoose';
import Game from '@/resources/game/game.interface';

const GameSchema = new Schema<Game>(
    {
      title: { type: String, required: true },
      gameType: { type: String, required: true },
      data: { type: Schema.Types.Mixed, required: true },
      createdBy: { type: Schema.Types.String, ref: 'User', required: true }, // Reference to User
    },
    { timestamps: true }
  );
  

export default model<Game>('Game', GameSchema)