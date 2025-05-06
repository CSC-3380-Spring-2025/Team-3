import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from '@/resources/user/user.validation'
import UserService from "@/resources/user/user.service";
import authenticated from '@/middleware/authenticated.middleware'

class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private UserService = new UserService();

    constructor () {
        this.initializeRoutes();
    }

    private initializeRoutes():void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register
        )
        this.router.post(
            `${this.path}/login`,
            this.login
        )
        this.router.get(`${this.path}`, authenticated, this.getUser);
        this.router.get(`${this.path}/me`, authenticated, this.getUser);
        this.router.get(`${this.path}/me/games`, authenticated, this.getUserGames);
        this.router.post(`${this.path}/me/games`, authenticated, this.addGameToUser);
    }

    private register = async(
        req:Request,
        res: Response,
        next:NextFunction
    ): Promise< void> => {
        try {
            const {name, email, password, role} = req.body;

            const token = await this.UserService.register(
                name,
                email,
                password,
                role,
            )

            res.status(201).json({token})
            return;
        } catch (error:any) {
            next(new HttpException(400, error.message))
        }
    }

    private login = async (
        req:Request,
        res:Response,
        next: NextFunction
    ):Promise< void> => {
        try {
            const {email, password, } = req.body;

            const token  = await this.UserService.login(email, password);

            res.status(200).json({token})
            return;
        } catch (error:any) {
            next(new HttpException(400, error.message))
        }
    }

    private getUser = ( req:Request,
        res:Response,
        next: NextFunction
    ):void =>{
        if (!req.user){
            return next(new HttpException(404, 'no logged in user'))
        }

        res.status(200).json({user: req.user})

        return;

    }
    private getUserGames = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          if (!req.user) {
            next(new HttpException(404, 'No logged in user'));
            return;
          }
          const userWithGames = await this.UserService.getUserGames(String(req.user._id));
          res.status(200).json({ games: userWithGames });
        } catch (error: any) {
          next(new HttpException(400, error.message));
        }
      }

      private addGameToUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          if (!req.user) {
            next(new HttpException(404, 'No logged in user'));
            return;
          }
          const { gameId } = req.body;
          const updatedUser = await this.UserService.addGameToUser(String(req.user._id), gameId);
          res.status(200).json({ user: updatedUser });
        } catch (error: any) {
          next(new HttpException(400, error.message));
        }
      }

}

export default UserController;