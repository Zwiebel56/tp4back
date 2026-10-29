import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import usuariosService from "../services/usuarios.service.js";


const register = async (req, res) => {
    const user = req.body;
    if (!user) {
        return res.status(400).json({ message: "No hay ningun usuario" });
    }
    if (!user.nombre || !user.password) {
        return res.status(400).json({ message: "Hay 1 campo o más sin completar" });
    }
    try {
        const usuarioID = await usuariosService.getUsuarioById(user.userid);
        if (usuarioID) {
            return res.status(400).json({ message: "El usuario ya existe con ese id" });
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

        const UsuarioNew = await usuariosService.createUsuario(user);

        return res.status(201).json({ message: "Usuario creado de forma exitosa" });

    } catch (error) {
        console.error("Error al registrar usuario:", error);
        return res.status(500).json({ message: error.message });
    }
};
const login = async (req, res) => {
    const { nombre,password } = req.body;
    if (!nombre||!password){
        return res.status(400).json({ message: "Hay campos sin completar" });
    }
    //try{
        console.log("1")
        const user=await usuariosService.getUsuarioByNombre(nombre);
        if(!user){
            return res.status(400).json({ message: "No hay ningun usuario, con ese id" });
        }
        console.log("password",password)
        console.log("user", user)
        const contraValida=await bcrypt.compare(password,user.password);
        if(!contraValida){
            return res.status(400).json({message:"Contraseña incorrecta, intente nuevamente"});
        }
        console.log("3")
        const payload = { id: user.userid };
        console.log("Creating token. Payload:", payload) 
        const token=jwt.sign(payload,"secret",{expiresIn:"1h"});
        return res.status(200).json({user, token})
    //}catch(e){
    //    return res.status(500).json({message:e.message});
    //} 
};

export  { register, login };