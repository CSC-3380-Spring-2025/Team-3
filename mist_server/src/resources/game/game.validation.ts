import Joi, { string } from 'joi';

const createGameSchema = Joi.object({
    title: Joi.string().required(),
    gameType: Joi.string().required(),
    data: Joi.object().required(),
    userId: Joi.string().required(), // Add userId
    gameID: Joi.string().required(),
    createdBy: Joi.string().required(), // Reference to User
});

export default {
    create: createGameSchema,
};
