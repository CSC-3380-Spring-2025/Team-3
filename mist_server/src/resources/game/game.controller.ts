import { Router, Request, Response, NextFunction } from "express";
import multer from "multer";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from "./game.validation";
import GameService from "./game.service";
import authenticated from "@/middleware/authenticated.middleware";

const upload = multer({ storage: multer.memoryStorage() });

class GameController implements Controller {
  public path   = "/games";
  public router = Router();
  private service = new GameService();

  constructor() { this.initializeRoutes(); }

  private initializeRoutes(): void {




    this.router.post(
      this.path,
      authenticated,
      upload.single("gameFile"),
      // multer puts Buffer in req.file.buffer
      (req, res, next) => {
        // inject the Base64 payload into req.body.data for Joi
        if (!req.file) {
          return next(new HttpException(400, "No game file uploaded"));
        }
        req.body.data = req.file.buffer.toString("base64");
        req.body.userId = (req.user as any)._id;
        next();
      },
      validationMiddleware(validate.create),
      this.createGame
    );

    this.router.get(this.path, authenticated, this.getAllGames);
    this.router.get(`${this.path}/:id`, authenticated, this.getGameById);
    this.router.delete(
      `${this.path}/:id`,
      authenticated,
      this.deleteGame
    );

    
  }

  private createGame = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, gameType, gameID, data, userId } = req.body;
      const game = await this.service.createGame({ title, gameType, gameID, data, userId });
      res.status(201).json({ game });
    } catch (err: any) {
      next(new HttpException(400, err.message));
    }
  };

  private getAllGames = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const games = await this.service.getAllGames();
      res.status(200).json({ games });
    } catch (err: any) {
      next(new HttpException(400, err.message));
    }
  };

  private getGameById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const game = await this.service.getGameById(req.params.id);
      res.status(200).json({ game });
    } catch (err: any) {
      next(new HttpException(400, err.message));
    }
  };

  private deleteGame = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const game = await this.service.deleteGame(req.params.id);
      res.status(200).json({ game });
    } catch (err: any) {
      next(new HttpException(400, err.message));
    }
  };
}

export default GameController;


// // src/resources/game/game.controller.ts
// import { Router, Request, Response, NextFunction } from "express";
// import multer from "multer";
// import Controller from "@/utils/interfaces/controller.interface";
// import HttpException from "@/utils/exceptions/http.exception";
// import validationMiddleware from "@/middleware/validation.middleware";
// import validate from "@/resources/game/game.validation";
// import GameService from "@/resources/game/game.service";
// import authenticated from "@/middleware/authenticated.middleware";
// import requireRole from "@/middleware/requireRole.middleware";

// const upload = multer({ storage: multer.memoryStorage() });  // <-- in-memory upload

// class GameController implements Controller {
//   public path = "/games";
//   public router = Router();
//   private gameService = new GameService();

//   constructor() {
//     this.initializeRoutes();
//   }

//   private initializeRoutes(): void {
//     this.router.post(
//       `${this.path}`,
//       authenticated,
//       upload.single("gameFile"),         // <-- handle multipart/form-data
//       validationMiddleware(validate.create),
//       //requireRole("programmer"),
//       this.createGame
//     );

//     this.router.get(
//       `${this.path}`,
//       authenticated,
//       this.getAllGames
//     );

//     this.router.get(
//       `${this.path}/:id`,
//       authenticated,
//       this.getGameById
//     );

//     this.router.delete(
//       `${this.path}/:id`,
//       authenticated,
//       requireRole("admin"),
//       this.deleteGame
//     );
//   }

//   private createGame = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> => {
//     try {
//       // multer puts the file buffer on req.file
//       if (!req.file) {
//         throw new HttpException(400, "No game file uploaded");
//       }

//       // Base64-encode the uploaded buffer
//       const dataBase64 = req.file.buffer.toString("base64");

//       const { title, gameType, gameID } = req.body;
//       const userId = (req.user as { _id: string })?._id;

//       const game = await this.gameService.createGame({
//         title,
//         gameType,
//         data: dataBase64,
//         userId,
//         gameID,
//       });

//       res.status(201).json({ game });
//     } catch (error: any) {
//       next(new HttpException(400, error.message));
//     }
//   };

//   private getAllGames = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> => {
//     try {
//       const games = await this.gameService.getAllGames();
//       res.status(200).json({ games });
//     } catch (error: any) {
//       next(new HttpException(400, error.message));
//     }
//   };

//   private getGameById = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> => {
//     try {
//       const { id } = req.params;
//       const game = await this.gameService.getGameById(id);

//       // game.data is the Base64 string
//       res.status(200).json({ game });
//     } catch (error: any) {
//       next(new HttpException(400, error.message));
//     }
//   };

//   private deleteGame = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> => {
//     try {
//       const { id } = req.params;
//       const game = await this.gameService.deleteGame(id);
//       res.status(200).json({ game });
//     } catch (error: any) {
//       next(new HttpException(400, error.message));
//     }
//   };
// }

// export default GameController;
