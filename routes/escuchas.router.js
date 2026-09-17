import { Router } from 'express';
import { postEscucho } from '../controllers/escuchas.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', verifyToken, postEscucho);

export default router;