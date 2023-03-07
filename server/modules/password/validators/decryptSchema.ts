import { Joi } from 'express-validation';

const decryptSchema = {
  body: Joi.object({
    innerPassword: Joi.string()
      .required(),
  }),
};

export { decryptSchema };