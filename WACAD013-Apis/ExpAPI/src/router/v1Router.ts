import { Router } from 'express';
import productRouter from '../resources/product/product.router';
import languageRouter from '../resources/language/language.router';
import usuarioRouter from '../resources/usuario/usuario.router';
import authRouter from '../resources/auth/auth.router';
import compraRouter from '../resources/compra/compra.router';

const router = Router();

router.use('/product', productRouter);
router.use('/language', languageRouter);
router.use('/usuario', usuarioRouter);
router.use('/auth', authRouter);
router.use('/compra', compraRouter);

export default router;