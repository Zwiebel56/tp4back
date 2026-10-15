//import pkg from 'pg';
//import dbconfig from './dbconfig.js';
import express from 'express';
//import bcrypt from 'bcrypt';
//import jwt from 'jsonwebtoken';
import cors from 'cors';
import authRoute from './routes/auth.router.js';
import cancionRouter from './routes/canciones.router.js';
import escuchaRouter from './routes/escuchas.router.js';


/*
const {Client} = pkg;
const client = new Client(dbconfig)
await client.connect()

const result = await client.query("SELECT * FROM usuario")
console.log(result.rows)
const usuario1 = result.rows[0].usuario
console.log("usuario1:",usuario1)

await client.end()
*/

const app = express()
app.use(cors());
app.use(express.json()); 
app.use('/auth',authRoute)
app.use('/cancion',cancionRouter)
app.use('/escucha',escuchaRouter)

// ¡DEFINIDO AQUÍ GLOBALMENTE PARA TODO EL ARCHIVO!
//const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_secreta_super_segura';

const port = 3000;

//app.get('/',(req,res)=>res.send("Welcome " + usuario1 ))


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Local en http://localhost:${PORT}`);
});
export default app;


