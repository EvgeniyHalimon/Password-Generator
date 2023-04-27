import { Joi } from 'express-validation';

const updatePasswordSchema = {
  body: Joi.object({
    id: Joi.string()
      .required(),
    applicationName: Joi.string()
      .required()
      .min(2),
    password: Joi.string()
      .required(),
  }),
};

export { updatePasswordSchema };