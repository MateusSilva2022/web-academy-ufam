import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import compraService from './compra.service';

async function addItem(req: Request, res: Response) {
  const item = req.body;

  if (!req.session.cart) {
    req.session.cart = [];
  }

  await compraService.addItem(req.session.cart, item);

  res.status(StatusCodes.OK).json(req.session.cart);
}

async function checkout(req: Request, res: Response) {
  if (!req.session.uid) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED);
  }

  if (!req.session.cart || req.session.cart.length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Carrinho vazio' });
  }

  const purchase = await compraService.checkout(
    req.session.uid,
    req.session.cart
  );

  res.status(StatusCodes.CREATED).json(purchase);
}

export default {
  addItem,
  checkout
};