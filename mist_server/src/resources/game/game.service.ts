import GameModel from '@/resources/game/game.model';
import Game from '@/resources/game/game.interface';

class GameService {
  private game = GameModel;

  public async createGame(data: {
    title: string;
    gameType: string;
    data: any;
  }): Promise<Game> {
    try {
      const game = await this.game.create(data);
      return game;
    } catch (error: any) {
      throw new Error('Unable to create game: ' + error.message);
    }
  }

}

export default GameService;