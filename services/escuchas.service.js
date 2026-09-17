import pool from '../db.js';

export const registrarEscucha = async (usuarioId, cancionId) => {
  const escuchaExistente = await pool.query(
    'SELECT * FROM escucha WHERE usuario_id = $1 AND cancion_id = $2',
    [usuarioId, cancionId]
  );

  if (escuchaExistente.rows.length > 0) {
    await pool.query(
      'UPDATE escucha SET reproducciones = reproducciones + 1 WHERE id = $1',
      [escuchaExistente.rows[0].id]
    );
  } else {
    await pool.query(
      'INSERT INTO escucha (usuario_id, cancion_id, reproducciones) VALUES ($1, $2, 1)',
      [usuarioId, cancionId]
    );
  }

  const totalQuery = await pool.query(
    'SELECT SUM(reproducciones) AS total FROM escucha WHERE usuario_id = $1',
    [usuarioId]
  );

  const totalReproducciones = parseInt(totalQuery.rows[0].total || 0, 10);

  if (totalReproducciones > 10) {
    await pool.query('UPDATE usuario SET fan = true WHERE id = $1', [usuarioId]);
  }

  return { totalReproducciones, esFan: totalReproducciones > 10 };
};