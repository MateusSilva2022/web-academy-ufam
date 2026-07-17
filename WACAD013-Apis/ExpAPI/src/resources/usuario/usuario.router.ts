import { Router } from 'express';
import usuarioController from './usuario.controller';
import isAuth from '../../middlewares/isAuth';
import isAdmin from '../../middlewares/isAdmin';

const router = Router();

router.get('/', isAuth, isAdmin, usuarioController.index);
router.post('/', isAuth, isAdmin, usuarioController.create);
router.get('/:id', isAuth, isAdmin, usuarioController.read);
router.put('/:id', isAuth, isAdmin, usuarioController.update);
router.delete('/:id', isAuth, isAdmin, usuarioController.remove);

export default router;