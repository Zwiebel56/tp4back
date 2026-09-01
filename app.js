import pkg from 'pg'
import dbconfig from './dbconfig.js'
import express from 'express'
import bcrypt from 'bcrypt' 
import jwt from 'jsonwebtoken'


const {Client} = pkg;
const client = new Client(dbconfig)
await client.connect()

const result = await client.query("SELECT * FROM usuario")
console.log(result.rows)
const usuario1 = result.rows[0].usuario
console.log("usuario1:",usuario1)

await client.end()

const app = express()
app.use(express.json()); 

// ¡DEFINIDO AQUÍ GLOBALMENTE PARA TODO EL ARCHIVO!
const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_secreta_super_segura';

const port = 3000;
app.get('/',(req,res)=>res.send("Welcome " + usuario1 ))
export default app;


const PORT = process.env.PORT || 3000;
//
app.listen(PORT, () => {
  console.log(`Local en http://localhost:${PORT}`);
});
//1
app.post('/crearusuario', async (req, res) => {
  const { id, nombre, password } = req.body;

  if (!id || !nombre || !password) {
    return res.status(400).json({ message: "Debe completar todos los campos" });
  }

  const client = new Client(dbconfig);
  try {
    await client.connect();
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await client.query(
      "INSERT INTO usuario (id, nombre, password) VALUES ($1, $2, $3) RETURNING id, nombre",
      [id, nombre, hashedPassword]
    );

    res.status(201).json({ message: "Usuario creado exitosamente", user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await client.end();
  }
});

//2
app.post('/login', async (req, res) => {
  const { userid, password } = req.body;

  if (!userid || !password) {
    return res.status(400).json({ message: "Falta usuario o contraseña" });
  }

  const client = new Client(dbconfig);
  try {
    await client.connect();
    const result = await client.query("SELECT * FROM usuario WHERE id = $1", [userid]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "El usuario no existe" });
    }

    const usuario = result.rows[0];
    const match = await bcrypt.compare(password, usuario.password);

    if (!match) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { userid: usuario.id, nombre: usuario.nombre },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await client.end();
  }
});

//3
const Token = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && (authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader);

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. Falta el Token." });
  }

  try {
    // Usa la variable global declarada arriba
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded; 
    next(); 
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};

// 2. Tu endpoint final adaptado exactamente a las columnas de tu imagen
app.get('/escucho', Token, async (req, res) => {
  const userid = req.usuario.userid; 
  const client = new Client(dbconfig);
  
  try {
    await client.connect();
    
    // Consulta usando 'idusuario' e 'idcanciones' como se ve en tu captura de pantalla
    const queryText = `
      SELECT c.nombre AS cancion, e.reproducciones 
      FROM escucha e 
      JOIN cancion c ON e.idcanciones = c.id 
      WHERE e.idusuario = $1
    `;
    
    const result = await client.query(queryText, [userid]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await client.end();
  }
});