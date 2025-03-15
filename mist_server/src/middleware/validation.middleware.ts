import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from 'joi';

function validationMiddleware(schema: Joi.Schema): RequestHandler{
    return async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };
        
        try{
            const value = await schema.validateAsync(
                req.body,
                validationOptions
            );
            req.body = value;
            next();
        } catch (e) {
            //or e: any
            if (e instanceof Joi.ValidationError) { // Ensures e is a Joi validation error
                const errors: string[] = e.details.map((detail) => detail.message); 
                res.status(400).send({ errors });
            } else {
                console.error("Unexpected error:", e);
                res.status(500).send({ error: "Internal Server Error" });
            }
        }
    }
};

export default validationMiddleware;