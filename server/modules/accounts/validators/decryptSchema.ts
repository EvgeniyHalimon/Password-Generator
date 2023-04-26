import { Joi } from 'express-validation';

const decryptSchema = {
  body: Joi.object({
    id: Joi.string()
      .required(),
    innerPassword: Joi.string()
      .required(),
  }),
};

export { decryptSchema };