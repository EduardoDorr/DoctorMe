import * as Joi from "joi";

export const agendaIdSchema =
  Joi.object({
    agendaId: Joi.number().required()
  });

export const patientIdSchema =
  Joi.object({
    id: Joi.number().required()
  });

  export const patientPhoneSchema =
  Joi.object({
    phone: Joi.number().required()
  });

  export const createPatientSchema =
  Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required()
  });