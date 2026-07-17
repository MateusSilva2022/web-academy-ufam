import { Request, Response, NextFunction } from 'express';
import authService from '../resources/auth/auth.service';

const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uid = (req as any).session?.uid;

  if (!uid) {
    return res.status(401).json({
      message: 'Usuário não autenticado'
    });
  }

  const admin = await authService.checkIsAdmin(uid);

  if (!admin) {
    return res.status(403).json({
      message: 'Acesso negado'
    });
  }

  next();
};

export default isAdmin;