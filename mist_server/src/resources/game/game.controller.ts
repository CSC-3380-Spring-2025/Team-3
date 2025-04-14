import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/game/game.validation";
import GameService from "@/resources/game/game.service";

class GameController implements Controller {
  public path = '/games';
  public router = Router();
  private gameService = new GameService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}`,
      validationMiddleware(validate.create),
      this.createGame
    );
    //get, post, delete
  }

  private createGame = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { title, gameType, data } = req.body;
      const game = await this.gameService.createGame({ title, gameType, data });
      res.status(201).json({ game });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  }
}

export default GameController;