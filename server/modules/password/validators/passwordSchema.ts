import { Joi } from 'express-validation';

const passwordSchema = {
  body: Joi.object({
    applicationName: Joi.string()
      .required(),
    password: Joi.string()
      .required(),
  }),
};

export { passwordSchema };