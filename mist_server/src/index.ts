import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/validateEnv';
import PostController from '@/resources/post/post.controller';
import UserController from './resources/user/user.controller';
import cors from "cors";

validateEnv();

const app = new App(
    [
        new PostController(),
        new UserController(),
        // Add other controllers here
    ],
    Number(process.env.PORT)
);

app.express.use(cors({ origin: "http://localhost:3000" })); // Allow frontend origin

app.listen();
