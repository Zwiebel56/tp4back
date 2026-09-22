import * as escuchasService from '../services/escuchas.service.js';

export const postEscucho = async (req, res) => {
  const { id } = req.body; 
  const usuarioId = req.user_id || req.user?.id; 

  if (!id) {
    return res.status(400).json({ error: "ID de canción requerido." });
  }

  try {
    const escucha = await escuchasService.buscarEscucha(usuarioId, id);

    if (escucha) {
      await escuchasService.incrementarEscucha(escucha.id);
    } else {
      await escuchasService.crearEscucha(usuarioId, id);
    }

    const total = await escuchasService.obtenerTotalReproducciones(usuarioId);

    if (total > 10) {
      await escuchasService.actualizarUsuarioFan(usuarioId);
    }

    return res.status(200).json({
      message: "Escucha registrada exitosamente",
      totalReproducciones: total,
      esFan: total > 10
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};