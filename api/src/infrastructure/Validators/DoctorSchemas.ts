import * as Joi from "joi";

export const DoctorIdSchema =
  Joi.object({
    id: Joi.number().required()
  });