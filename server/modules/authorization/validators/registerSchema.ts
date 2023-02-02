import { Joi } from 'express-validation';

const registerSchema = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .required(),
    password: Joi.string()
      .required(),
    innerPassword: Joi.string()
      .required(),
    username: Joi.string()
      .required(),
  }),
};

export { registerSchema }