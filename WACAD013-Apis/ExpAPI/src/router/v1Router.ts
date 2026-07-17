import { Router } from 'express';
import productRouter from '../resources/product/product.router';
import languageRouter from '../resources/language/language.router';
import usuarioRouter from '../resources/usuario/usuario.router';

const router = Router();

router.use('/product', productRouter);
router.use('/language', languageRouter);
router.use('/usuario', usuarioRouter);

export default router;