import { Router } from 'express';
import { analyzeProfile } from '../controllers/profile.controller.js';
const router = Router();
router.post('/profile-analyze', analyzeProfile);
export default router;
