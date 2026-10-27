import jwt from "jsonwebtoken";
import usuariosService from "../services/usuarios.service.js";

export const verifyToken = async (req, res, next) => {
    console.log("Verifying token...");
 const authHeader = req.headers['authorization'];
 if (!authHeader) {
   return res.status(401).send({ error: 'No llegó ningún token en los headers' });
 }
 const token = authHeader.split(' ')[1];
 try {
   const decoded = jwt.verify(token, 'secret');
   req.user = decoded;
   console.log("Token verified:", req.user);
   next();
 } catch (err) {
   console.error(err);
   return res.status(401).send({ error: 'Unauthorized' });
 }
}

export const verifyAdmin = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'no user' });
    }
    console.log("req.user:", req.user);

    const user=await usuariosService.getUsuarioById(req.user.id);

        console.log("db.user:", user);
   if (!user.admin) {
       return res.status(403).send({ error: 'Forbidden' });
   }
   next();
}