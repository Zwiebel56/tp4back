import cancionService from "../services/canciones.service.js";

console.log("*** Cancion controller ****")
const getCanciones = async (req, res) => {
    console.log
    try {
        const canciones = await cancionService.getCanciones(req.user.id);
        return res.status(200).json(canciones);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const escuchoCancion = async (req, res) => {
    const escucha = req.body;
    if ( !escucha.cancion) {
        return res.status(400).json({ message: "Hay 1 campo o más sin completar" });
    }
    try {
        const nuevaCancion = await cancionService.escuchoCancion(escucha.cancion, req.user.id);
        return res.status(201).json(nuevaCancion);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const postCancion = async (req, res) => {
    const cancion = req.body;
    if (!cancion.nombre) {  
        return res.status(400).json({ message: "Hay 1 campo o más sin completar" });
    }
    try {
        const nuevaCancion = await cancionService.postCancion(cancion);
        return res.status(201).json(nuevaCancion);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const putCancion = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ message: "El campo nombre es obligatorio" });
    }
    try {
        const cancionActualizada = await cancionService.putCancion(id, nombre);
        return res.status(200).json(cancionActualizada);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteCancion = async (req, res) => {
    const { id } = req.params;
    try {
        await cancionService.deleteCancion(id);
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

 

export default { getCanciones,escuchoCancion, postCancion, putCancion, deleteCancion };