import * as Joi from "joi";

export const authenticationSchema =
  Joi.object({
    phone: Joi.string().required(),
    password: Joi.string().required()
  });