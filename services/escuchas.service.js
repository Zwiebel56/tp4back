import pool from '../db.js';

export const buscarEscucha = async (id) => {
  const result = awaitpool.query(
    'SELECT * FROM escucha WHERE usuario_id = $1 AND cancion_id = $2',
    [usuarioId, cancionId]
  );
  return result.rows[0];
}

export const crearEscucha = async (usuarioId, cancionId) => {
  return await pool.query(
    'INSERT INTO escucha (usuario_id, cancion_id, reproducciones) VALUES ($1, $2, 1)',
    [usuarioId, cancionId]
  );
};

export const incrementarEscucha = async (id) => {
  return await pool.query(
    'UPDATE escucha SET reproducciones = reproducciones + 1 WHERE id = $1',
    [id]
  );
};

export const obtenerTotalReproducciones = async (usuarioId) => {
  const result = await pool.query(
    'SELECT SUM(reproducciones) AS total FROM escucha WHERE usuario_id = $1',
    [usuarioId]
  );
  return parseInt(result.rows[0].total || 0, 10);
};

export const actualizarUsuarioFan = async (usuarioId) => {
  return await pool.query(
    'UPDATE usuario SET fan = true WHERE id = $1',
    [usuarioId]
  );
};