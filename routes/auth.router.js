import { Router } from 'express';
import { login, crearUsuario } from '../controllers/auth.controller.js';
import Router from "express";


const router = Router();

router.post('/login', login);
router.post('/crearusuario', crearUsuario);

export default router;