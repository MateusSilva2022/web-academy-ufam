import { Request, Response } from 'express';
import usuarioService from './usuario.service';
import {
  createUsuarioSchema,
  updateUsuarioSchema
} from './usuario.schema';

async function index(req: Request, res: Response) {
  const usuarios = await usuarioService.index();
  res.json(usuarios);
}

async function create(req: Request, res: Response) {
  const { error, value } = createUsuarioSchema.validate(req.body, {
    abortEarly: false
  });

  if (error) {
    res.status(422).json({
      error: error.details.map(detail => ({
        message: detail.message,
        path: detail.path
      }))
    });
    return;
  }

  try {
    const usuario = await usuarioService.create(value);
    res.status(201).json(usuario);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: 'Não foi possível cadastrar o usuário',
      error: error instanceof Error ? error.message : error
    });
  }
}

async function read(req: Request, res: Response) {
  const usuario = await usuarioService.read(req.params.id as string);

  if (!usuario) {
    res.status(404).json({
      message: 'Usuário não encontrado'
    });
    return;
  }

  res.json(usuario);
}

async function update(req: Request, res: Response) {
  const { error, value } = updateUsuarioSchema.validate(req.body, {
    abortEarly: false
  });

  if (error) {
    res.status(422).json({
      error: error.details.map(detail => ({
        message: detail.message,
        path: detail.path
      }))
    });
    return;
  }

  try {
    const usuario = await usuarioService.update(
      req.params.id as string,
      value
    );

    res.json(usuario);
  } catch (error) {
    console.error(error);

    res.status(404).json({
      message: 'Usuário não encontrado',
      error: error instanceof Error ? error.message : error
    });
  }
}

async function remove(req: Request, res: Response) {
  try {
    await usuarioService.remove(req.params.id as string);
    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(404).json({
      message: 'Usuário não encontrado',
      error: error instanceof Error ? error.message : error
    });
  }
}

export default {
  index,
  create,
  read,
  update,
  remove
};