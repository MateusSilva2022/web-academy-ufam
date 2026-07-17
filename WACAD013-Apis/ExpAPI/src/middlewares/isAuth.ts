import { Request, Response, NextFunction } from 'express';

const isAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ((req as any).session?.uid) {
    return next();
  }

  return res.status(401).json({
    message: 'Usuário não autenticado'
  });
};

export default isAuth;