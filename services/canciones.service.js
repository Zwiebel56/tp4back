import Cancion from "../models/cancion.js";

export const crearCancion = async (nombre) => {
  return await Cancion.create({ nombre });
};

export const actualizarCancion = async (id, nombre) => {
  const cancion = await Cancion.findByPk(id);
  if (!cancion) return null;
  return await cancion.update({ nombre });
};

export const eliminarCancion = async (id) => {
  const cancion = await Cancion.findByPk(id);
  if (!cancion) return null;
  await cancion.destroy();
  return cancion;
};