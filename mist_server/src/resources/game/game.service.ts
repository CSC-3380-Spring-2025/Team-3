import GameModel from '@/resources/game/game.model';
import Game from '@/resources/game/game.interface';

class GameService {
  private game = GameModel;

  public async createGame(data: {
    title: string;
    gameType: string;
    data: any;
    userId: string; // Add userId
    gameID: string;

  }): Promise<Game> {
    try {
      const game = await this.game.create({
        ...data,
        createdBy: data.userId, // Associate game with user
      });
      return game;
    } catch (error: any) {
      throw new Error('Unable to create game: ' + error.message);
    }
  }

  getAllGames = async (): Promise<Game[]> => {
    try {
      const games = await this.game.find().populate('createdBy', 'name email');
      return games;
    } catch (error: any) {
      throw new Error('Unable to fetch games: ' + error.message);
    }
  }
  getGameById = async (id: string): Promise<Game | null> => {
    try {
      const game = await this.game.findById(id).populate('createdBy', 'name email');
      if (!game) {
        throw new Error('Game not found');
      }
      return game;
    } catch (error: any) {
      throw new Error('Unable to fetch game: ' + error.message);
    }
  }

  public async deleteGame(id: string): Promise<Game | null> {
    try {
      const game = await this.game.findByIdAndDelete(id);
      if (!game) {
        throw new Error('Game not found');
      }
      return game;
    } catch (error: any) {
      throw new Error('Unable to delete game: ' + error.message);
    }
  }

}

export default GameService;