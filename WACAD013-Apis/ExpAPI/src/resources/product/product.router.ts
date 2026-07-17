import { Router } from 'express';
import productController from './product.controller';
import isAuth from '../../middlewares/isAuth';

const router = Router();

router.get('/', isAuth, productController.index);
router.post('/', isAuth, productController.create);
router.get('/:id', isAuth, productController.read);
router.put('/:id', isAuth, productController.update);
router.delete('/:id', isAuth, productController.remove);

export default router;