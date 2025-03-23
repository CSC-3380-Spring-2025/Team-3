import GameModel from '@/resources/game/game.model'; 
import Game from '@/resources/game/game.interface';

class GameService{
    private game = GameModel;

    public async createGame(data: {
      title: string;
      sprite: string;
      player: string;
      gameObject?: string;
      obstacle?: string;
      border?: string;
      enemy?: string;
      bullets?: string;
      background?: string;
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