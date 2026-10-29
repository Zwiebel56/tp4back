import pkg from 'pg'
const {Client} = pkg;
import { config } from "../dbconfig.js";

import { Usuario } from '../models/usuario.js';


const getUsuarioById = async (id) => {
        const u = await Usuario.findByPk(id);
        if (!u) return null;
        return u;
 
};



const getUsuarioByNombre = async (nombre) => {
        const u =await Usuario.findAll({"where": {nombre}});
        if (!u) return null;
        return u[0];
 
};

const createUsuario = async (usuario) => {
        const u = await Usuario.create(usuario);    
        return u;
 
}
export default { getUsuarioById, createUsuario, getUsuarioByNombre };