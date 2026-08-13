import { Router } from 'express';
import productController from './product.controller';

const router = Router();

router.get('/', (req, res, next) => {
  /* #swagger.tags = ['Produto']
     #swagger.summary = 'Listagem de produtos.' */
  productController.index(req, res, next);
});

router.post('/', (req, res, next) => {
  /* #swagger.tags = ['Produto']
     #swagger.summary = 'Adiciona um novo produto na base.' */
  productController.create(req, res, next);
});

export default router;