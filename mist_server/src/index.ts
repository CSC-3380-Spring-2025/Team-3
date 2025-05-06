import 'dotenv/config';
import 'module-alias/register';

import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import validateEnv from '@/utils/validateEnv';
import PostController from '@/resources/post/post.controller';
import UserController from '@/resources/user/user.controller';
import LeaderboardController from '@/resources/leaderboard/leaderboard.controller';

validateEnv();

mongoose
  .connect(process.env.MONGO_URI!, {
    // useNewUrlParser:    true,
    // useUnifiedTopology: true,
  } as any) 
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const app = express();

app.use(
  cors({ origin: 'http://localhost:3000', credentials: true })
);
app.use(express.json());

;[
  new PostController(),
  new UserController(),
  new LeaderboardController(),
].forEach((ctr) => {
  app.use('/api' + ctr.path, ctr.router);
});

app.use(
  (err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(err.status || 500).json({
      error: err.message || 'Internal Server Error'
    });
  }
);

const PORT = Number(process.env.PORT) || 5001;
app.listen(PORT, () =>
  console.log(`API listening on http://localhost:${PORT}/`)
);