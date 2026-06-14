import { Router } from 'express';
import { checkAuthenticity } from '../controllers/authenticity.controller.js';
const router = Router();
router.post('/authenticity-check', checkAuthenticity);
export default router;
