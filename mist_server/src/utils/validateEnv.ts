import { cleanEnv, str, port } from "envalid";

function validateEnv(): void { 
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production']
        }),
        // MONGO_PASSWORD: str(),
        // MONGO_PATH: str(),
        // MONGO_USER: str(),
        PORT: port({ default: 5000}),
        JWT_SECRET: str(),
    });
}

export default validateEnv;