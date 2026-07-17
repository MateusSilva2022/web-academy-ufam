import { Router } from 'express';
import { changeLanguage } from './language.controller';

const router = Router();

router.post('/', changeLanguage);

export default router;