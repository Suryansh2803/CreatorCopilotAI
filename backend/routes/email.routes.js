import { Router } from 'express';
import { generateEmail } from '../controllers/email.controller.js';
const router = Router();
router.post('/email-generate', generateEmail);
export default router;
