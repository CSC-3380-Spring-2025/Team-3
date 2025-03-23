import Joi, { string } from "joi";

const createGameSchema = Joi.object({
    title: Joi.string().required(),
    sprite: Joi.string().required(),
    player: Joi.string().required(),
    gameObject: Joi.string().optional(),
    obstacle: Joi.string().optional(),
    border: Joi.string().optional(),
    enemy: Joi.string().optional(),
    bullets: Joi.string().optional(),
    background: Joi.string().optional()
  });
  
  export default {
    create: createGameSchema
  };