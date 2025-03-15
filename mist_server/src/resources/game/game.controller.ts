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
        this.router.game(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        )
    };

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction,

    ): Promise<void> => {
        try {
            const { title, body } = req.body;

            const game = await this.GameService.create(title, body);

            res.status(201).json({ game })
        } catch (error) {
            //could also do error.message and rely on the message sent from the service 
            next(new HttpException(400, 'Cannot create this game'));
        }
    }
}

export default GameController;
