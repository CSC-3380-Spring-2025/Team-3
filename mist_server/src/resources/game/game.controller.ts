import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/game/game.validation";
import GameService from "@/resources/game/game.service";
import authenticated from "@/middleware/authenticated.middleware"; // Import middleware
import requireRole from "@/middleware/requireRole.middleware";

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
      authenticated, // Ensure user is authenticated
      validationMiddleware(validate.create),
      //requireRole("programmer"),
      this.createGame
    );
    //get, post, delete
    this.router.get(
      `${this.path}`,
      authenticated, 
      this.getAllGames
    );
    this.router.get(
      `${this.path}/:id`,
      authenticated,
      this.getGameById
    );
    this.router.delete(
      `${this.path}/:id`,
      authenticated,
      requireRole("admin"),
      this.deleteGame
    );

  }

  private createGame = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { title, gameType, data } = req.body;
      const userId = (req.user as { _id: string })?._id;
      const game = await this.gameService.createGame({ title, gameType, data, userId });
      res.status(201).json({ game });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  }

  private getAllGames = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const games = await this.gameService.getAllGames();
      res.status(200).json({ games });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  }
  private getGameById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const game = await this.gameService.getGameById(id);
      res.status(200).json({ game });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  }

  private deleteGame = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const game = await this.gameService.deleteGame(id);
      res.status(200).json({ game });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  }
}

export default GameController;