import { Schema, model} from 'mongoose';
import Game from '@/resources/game/game.interface';

const GameSchema = new Schema<Game>(
    {
      title: { type: String, required: true },
      gameType: { type: String },
      data: { type: Schema.Types.Mixed, required: true },
      createdBy: { type: Schema.Types.String, ref: 'User', required: true }, // Reference to User
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
      gameId: { type: String, required: true },

      
    },
    { timestamps: true }
  );
  

export default model<Game>('Game', GameSchema)