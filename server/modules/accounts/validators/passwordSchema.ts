import { Joi } from 'express-validation';

const passwordSchema = {
  body: Joi.object({
    applicationName: Joi.string()
      .required()
      .min(2),
    password: Joi.string()
      .required(),
  }),
};

export { passwordSchema };