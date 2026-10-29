import * as escuchasService from '../services/escuchas.service.js';

export const postEscucho = async (req, res) => {
  const { id } = req.body; 
  const usuarioId = req.user.id; 
  console.log("post 1", req.user.id)

  if (!id) {
    return res.status(400).json({ error: "ID de canción requerido." });
  }
  console.log("post 2")
  //try {
    const escucha = await escuchasService.buscarEscucha(usuarioId, id);
    console.log("post 3")
    if (escucha) {
      await escuchasService.incrementarEscucha(escucha.id);
    } else {
      await escuchasService.crearEscucha(usuarioId, id);
    }

    const total = await escuchasService.obtenerTotalReproducciones(usuarioId);

    return res.status(200).json({
      message: "Escucha registrada exitosamente",
      totalReproducciones: total
    });
  //} catch (error) {
   // return res.status(500).json({ error: error.message });
  //}
};