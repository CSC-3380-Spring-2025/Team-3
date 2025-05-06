import { Request, Response, NextFunction, Router } from 'express';
import { Types } from 'mongoose';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/user/user.validation';
import UserService from '@/resources/user/user.service';
import authenticated from '@/middleware/authenticated.middleware';

type RequestWithUser = Request & { user?: { _id: Types.ObjectId; [key: string]: any } };

export default class UserController implements Controller {
  public path = '/users';
  public router = Router();
  private userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Public routes
    this.router.post(
      '/register',
     // validationMiddleware(validate.register),
      this.register.bind(this)
    );

    this.router.post(
      '/login',
      validationMiddleware(validate.login),
      this.login.bind(this)
    );

    // Protect all routes below
    this.router.use(authenticated);

    // Protected routes
    this.router.get('/me', this.getCurrentUser.bind(this));
    this.router.get('/me/games', this.getUserGames.bind(this));
    this.router.post('/me/games', this.addGameToUser.bind(this));
  }

  private async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    console.log("[REGISTER] Request body:", req.body); 
  
    try {
      const { name, email, password, role } = req.body;
      const token = await this.userService.register(name, email, password, role);
      res.status(201).json({ token, role });
    } catch (error: any) {
      console.error("[REGISTER ERROR]", error); 
      next(new HttpException(400, error.message));
    }
  }

  private async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      const { token, role } = await this.userService.login(email, password); 
      res.status(200).json({ token });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  }

  private getCurrentUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const userReq = req as RequestWithUser;
    if (!userReq.user) {
      return next(new HttpException(404, 'No logged-in user'));
    }
    res.status(200).json(userReq.user);
  }

  private async getUserGames(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userReq = req as RequestWithUser;
      const userId = userReq.user?._id.toString();
      if (!userId) {
        return next(new HttpException(404, 'No logged-in user'));
      }
      const games = await this.userService.getUserGames(userId);
      res.status(200).json({ games });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  }

  private async addGameToUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userReq = req as RequestWithUser;
      const userId = userReq.user?._id.toString();
      if (!userId) {
        return next(new HttpException(404, 'No logged-in user'));
      }
      const { gameId } = req.body;
      const updatedUser = await this.userService.addGameToUser(
        userId,
        gameId
      );
      res.status(200).json({ user: updatedUser });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  }
}
