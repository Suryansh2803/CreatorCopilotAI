import { Router } from 'express';
import { generateContent } from '../controllers/content.controller.js';
const router = Router();
router.post('/content-generate', generateContent);
export default router;
