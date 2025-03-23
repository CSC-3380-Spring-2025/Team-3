import {Router, Request, Response, NextFunction} from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/game/game.validation';
import GameService from '@/resources/game/game.service';

class GameController implements Controller {
    public path = '/games';
    public router = Router();
    private GameService = new GameService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.createGame
        )
    };

    private createGame = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { title, sprite, player, gameObject, obstacle, border, enemy, bullets, background } = req.body;
      const game = await this.GameService.createGame({ title, sprite, player, gameObject, obstacle, border, enemy, bullets, background });
      res.status(201).json({ game });
    } catch (error: any) {
      next(new HttpException(400, error.message));
        }
    }
}

export default GameController;
