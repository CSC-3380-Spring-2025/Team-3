import Joi, { string } from 'joi';

const createGameSchema = Joi.object({
    title: Joi.string().required(),
    gameType: Joi.string().required(),
    data: Joi.object().required(),
});

export default {
    create: createGameSchema,
};
