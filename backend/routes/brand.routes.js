import { Router } from 'express';
import { matchBrands } from '../controllers/brand.controller.js';
const router = Router();
router.post('/brand-match', matchBrands);
export default router;
