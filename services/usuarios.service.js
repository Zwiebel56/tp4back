import Usuario from "../models/usuario.js";

export const getUsuarioById = async (userid) => {
  return await Usuario.findByPk(userid);
};

export const crearUsuario = async (userid, nombre, password) => {
  return await Usuario.create({
    userid,
    nombre,
    password,
    admin: false,
  });
};