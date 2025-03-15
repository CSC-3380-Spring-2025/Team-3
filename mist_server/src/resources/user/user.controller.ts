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

    }

    private register = async(
        req:Request,
        res: Response,
        next:NextFunction
    ): Promise< void> => {
        try {
            const {name, email, password} = req.body;

            const token = await this.UserService.register(
                name,
                email,
                password,
                'user'
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
}

export default UserController;