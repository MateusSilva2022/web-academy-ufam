import { Router } from 'express';
import authController from './auth.controller';

const router = Router();

router.post('/login', (req, res, next) => {
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Login de usuários.' */
  authController.login(req, res, next);
});

router.post('/logout', (req, res, next) => {
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Logout de usuário logado.' */
  authController.logout(req, res, next);
});

export default router;