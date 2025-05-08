import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from 'joi';

function validationMiddleware(schema: Joi.Schema): RequestHandler {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const validationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    try {
      const value = await schema.validateAsync(req.body, validationOptions);
      req.body = value;
      next();
    } catch (e) {
      if (e instanceof Joi.ValidationError) {
        const errors: string[] = e.details.map((detail) => detail.message);
        
        console.error("[VALIDATION ERROR]", errors);

        res.status(400).send({ errors });
      } else {
        console.error("[UNEXPECTED VALIDATION ERROR]", e);
        res.status(500).send({ error: "Internal Server Error" });
      }
    }
  };
}

export default validationMiddleware;