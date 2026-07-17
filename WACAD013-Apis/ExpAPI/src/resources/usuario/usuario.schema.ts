import Joi from 'joi';

export const createUsuarioSchema = Joi.object({
  tipoUsuarioId: Joi.string()
    .uuid()
    .required(),

  nome: Joi.string()
    .min(3)
    .max(100)
    .required(),

  email: Joi.string()
    .email()
    .max(50)
    .required(),

  senha: Joi.string()
    .min(8)
    .max(80)
    .required(),
});

export const updateUsuarioSchema = Joi.object({
  tipoUsuarioId: Joi.string()
    .uuid(),

  nome: Joi.string()
    .min(3)
    .max(100),

  email: Joi.string()
    .email()
    .max(50),

  senha: Joi.string()
    .min(8)
    .max(80),
}).min(1);