import { config } from "../dbconfig.js"
import pool from '../db.js';

export const crearCancion = async (nombre) => {
  const result = await pool.query(
    'INSERT INTO cancion (nombre) VALUES ($1) RETURNING *',
    [nombre]
  );
  return result.rows[0];
};

export const actualizarCancion = async (id, nombre) => {
  const result = await pool.query(
    'UPDATE cancion SET nombre = $1 WHERE id = $2 RETURNING *',
    [nombre, id]
  );
  return result.rows[0];
};

export const eliminarCancion = async (id) => {
  const result = await pool.query(
    'DELETE FROM cancion WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};