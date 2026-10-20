import Escucha from "../models/escucha.js";

export const buscarEscucha = async (usuarioId, cancionId) => {
  return await Escucha.findOne({
    where: {
      usuario_id: usuarioId,
      cancion_id: cancionId,
    },
  });
};

export const crearEscucha = async (usuarioId, cancionId) => {
  return await Escucha.create({
    usuario_id: usuarioId,
    cancion_id: cancionId,
    reproducciones: 1,
  });
};

export const incrementarEscucha = async (id) => {
  const escucha = await Escucha.findByPk(id);
  if (escucha) {
    return await escucha.increment("reproducciones", { by: 1 });
  }
  return null;
};

export const obtenerTotalReproducciones = async (usuarioId) => {
  const total = await Escucha.sum("reproducciones", {
    where: { usuario_id: usuarioId },
  });
  return total || 0;
};