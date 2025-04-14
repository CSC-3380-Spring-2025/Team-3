import GameModel from '@/resources/game/game.model';
import Game from '@/resources/game/game.interface';

class GameService {
  private game = GameModel;

  public async createGame(data: {
    title: string;
    gameType: string;
    data: any;
    userId: string; // Add userId
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

}

export default GameService;