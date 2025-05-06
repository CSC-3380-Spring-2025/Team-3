import express, {Application} from "express";
import mongoose from "mongoose";
import compression from "compression";
import morgan from "morgan";
import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from '@/middleware/error.middleware';
import cors from "cors";
import helmet from "helmet";
import leaderboardRoutes from "./resources/leaderboard/leaderboard.routes";


class App{
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number){
    this.express = express()
    this.port = port

    this.initializeDatabaseConnection();
    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
    this.express.use("/api/leaderboard", leaderboardRoutes);
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use('/api', controller.router);

    });
  }

  private initializeErrorHandling(): void {
    this.express.use(ErrorMiddleware);

  }

  private initializeDatabaseConnection(): void {
    const { AUTH_ENABLED, MONGO_URI, MONGO_USER, MONGO_PASSWORD, MONGODB_URI } = process.env;
  
    let connectionString: string;
    if (AUTH_ENABLED === "true") {
      connectionString = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGODB_URI}`;
    } else {
      connectionString = MONGO_URI!;
    }
  
    mongoose.connect(connectionString)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
      });
  }
  

  public listen(): void{
    this.express.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`)
    })
  }
}

export default App

// dotenv.config();

// const app = express();


// app.use(cors());
// app.use(express.json());

// connectDB();


// app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "oh what i would do for the green m&m;D!" });
// });

// // Start it 
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
