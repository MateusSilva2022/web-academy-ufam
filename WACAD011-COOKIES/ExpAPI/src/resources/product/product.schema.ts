import Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required(),

  price: Joi.number()
    .positive()
    .precision(2)
    .required(),

  stock: Joi.number()
    .integer()
    .min(0)
    .required(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100),

  price: Joi.number()
    .positive()
    .precision(2),

  stock: Joi.number()
    .integer()
    .min(0),
}).min(1);