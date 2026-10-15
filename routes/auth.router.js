import { Router } from 'express';
import { login, crearUsuario } from '../controllers/auth.controller.js';


const router = Router();

router.post('/login', login);
router.post('/crearusuario', crearUsuario);

export default router;

