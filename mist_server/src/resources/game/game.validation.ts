import Joi from "joi";

const createGameSchema = Joi.object({
  title:     Joi.string().required(),
  gameType:  Joi.string().required(),
  gameID:    Joi.string().required(),
  data:      Joi.string().required(),  // Base64
  userId:    Joi.string().hex().length(24).required(),
})
  .unknown(true); // allow multer.file props

export default { create: createGameSchema };
