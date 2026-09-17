import pool from '../db.js';

export const getUsuarioById = async (id) => {
  const result = await pool.query('SELECT * FROM usuario WHERE id = $1', [id]);
  return result.rows[0];
};

export const crearUsuario = async (id, nombre, password) => {
  const result = await pool.query(
    "INSERT INTO usuario (id, nombre, password, rol, fan) VALUES ($1, $2, $3, 'U', false) RETURNING id, nombre, rol, fan",
    [id, nombre, password]
  );
  return result.rows[0];
};