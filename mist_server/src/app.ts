import express, { Application } from "express";
import mongoose from "mongoose";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import Controller from "@/utils/interfaces/controller.interface";
import ErrorMiddleware from "@/middleware/error.middleware";
import leaderboardRoutes from "./resources/leaderboard/leaderboard.routes";

class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.initializeDatabaseConnection();
    this.initializeMiddleware();
    this.initializeRoutes(controllers); 
    this.initializeErrorHandling();
  }

  private initializeMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan("dev"));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  private initializeRoutes(controllers: Controller[]): void {
    this.express.use("/api/leaderboard", leaderboardRoutes);

    controllers.forEach((controller: Controller) => {
      this.express.use("/api", controller.router);
    });
  }

  private initializeErrorHandling(): void {
    this.express.use(ErrorMiddleware);
  }

  private initializeDatabaseConnection(): void {
    const {
      AUTH_ENABLED,
      MONGO_URI,
      MONGO_USER,
      MONGO_PASSWORD,
      MONGODB_URI,
    } = process.env;

    const connectionString =
      AUTH_ENABLED === "true"
        ? `mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGODB_URI}`
        : MONGO_URI!;

    mongoose
      .connect(connectionString)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
      });
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }
}

export default App;