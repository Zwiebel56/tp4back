import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as usuariosService from '../services/usuarios.service.js';

export const crearUsuario = async (req, res) => {
  const { id, nombre, password } = req.body;

  if (!id || !nombre || !password) {
    return res.status(400).json({ error: "Debe completar todos los campos." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = await usuariosService.crearUsuario(id, nombre, hashedPassword);
    return res.status(201).json({ message: "Usuario creado bien", user: nuevoUsuario });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { userid, password } = req.body;

  if (!userid || !password) {
    return res.status(400).json({ error: "Falta usuario o contraseña." });
  }

  try {
    const usuario = await usuariosService.getUsuarioById(userid);

    if (!usuario) {
      return res.status(404).json({ error: "El usuario no existe." });
    }

    const match = await bcrypt.compare(password, usuario.password);

    if (!match) {
      return res.status(401).json({ error: "contraseña mal" });
    }

    // Firma del token agregando el rol requerida para verifyAdmin
    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '2h' }
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};