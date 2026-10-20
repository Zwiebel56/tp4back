import * as cancionesService from '../services/canciones.service.js';

export const postCancion = async (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: "Nombre de canción requerido." });
  }

  try {
    const cancion = await cancionesService.crearCancion(nombre);
    return res.status(201).json(cancion);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const putCancion = async (req, res) => {
  const { nombre } = req.body;
  const { id } = req.params.id;

  if (!id || !nombre) {
    return res.status(400).json({ error: "ID y nombre requeridos." });
  }

  try {
    const cancion = await cancionesService.actualizarCancion(id, nombre);

    if (!cancion) {
      return res.status(404).json({ error: "Canción no encontrada." });
    }

    return res.status(200).json(cancion);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteCancion = async (req, res) => {
  const { id } = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "ID requerido." });
  }

  try {
    const cancion = await cancionesService.eliminarCancion(id);

    if (!cancion) {
      return res.status(404).json({ error: "Canción no encontrada." });
    }

    return res.status(200).json({ message: "Canción eliminada correctamente." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};