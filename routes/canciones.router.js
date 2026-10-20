import { Router } from 'express';
import { postCancion, putCancion, deleteCancion } from '../controllers/canciones.controller.js';
import { verifyToken, verifyAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', verifyToken, verifyAdmin, postCancion);
router.put('/:id', verifyToken, verifyAdmin, putCancion);
router.delete('/:id', verifyToken, verifyAdmin, deleteCancion);

export default router;