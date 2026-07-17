import { Request, Response } from 'express';
import productService from './product.service';
import {
  createProductSchema,
  updateProductSchema
} from './product.schema';

async function index(req: Request, res: Response) {
  const products = await productService.index();
  res.json(products);
}

async function create(req: Request, res: Response) {
  const { error, value } = createProductSchema.validate(req.body, {
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
    const product = await productService.create(value);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      message: 'Não foi possível cadastrar o produto'
    });
  }
}

async function read(req: Request, res: Response) {
  const product = await productService.read(req.params.id);

  if (!product) {
    res.status(404).json({
      message: 'Produto não encontrado'
    });
    return;
  }

  res.json(product);
}

async function update(req: Request, res: Response) {
  const { error, value } = updateProductSchema.validate(req.body, {
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
    const product = await productService.update(
      req.params.id,
      value
    );

    res.json(product);
  } catch (error) {
    res.status(404).json({
      message: 'Produto não encontrado'
    });
  }
}

async function remove(req: Request, res: Response) {
  try {
    await productService.remove(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({
      message: 'Produto não encontrado'
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