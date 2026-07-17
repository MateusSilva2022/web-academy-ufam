import { Request, Response } from 'express';
import authService from './auth.service';

async function login(req: Request, res: Response) {
  const usuario = await authService.login(req.body);

  if (!usuario) {
    return res.status(401).json({
      message: 'Email ou senha inválidos'
    });
  }

  (req as any).session.uid = usuario.id;

  return res.json({
    message: 'Login realizado com sucesso',
    usuario: {
      id: usuario.id,
      nome: usuario.name,
      email: usuario.email,
      tipo: usuario.userType.label
    }
  });
}

async function logout(req: Request, res: Response) {
  (req as any).session.destroy(() => {
    res.json({
      message: 'Logout realizado com sucesso'
    });
  });
}

export default {
  login,
  logout
};