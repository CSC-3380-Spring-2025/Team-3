import GameModel from '@/resources/game/game.model'; 
import Game from '@/resources/game/game.interface';

class GameService{
    private game = GameModel;

    /*
    create a new game
    */
   public async create(title: string, body:string): Promise<Game> {
    try {
        const game = await this.game.create({title, body});

        return game;
    } catch (error) {
        throw new Error('unable to create a game');
    }
   }
}

export default GameService;