import { NextFunction, Request, Response } from 'express';

export function setLangCookie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.cookies.lang) {
    res.cookie('lang', 'pt-BR');
  }

  next();
}