import pkg from 'pg'
import dbconfig from './dbconfig.js'
import express from 'express'

const {Client} = pkg;
const client = new Client(dbconfig)
await client.connect()

const result = await client.query("SELECT * FROM usuario")
console.log(result.rows)
const usuario1 = result.rows[0].usuario
console.log("usuario1:",usuario1)

await client.end()

const app = express()
const port = 3000;
app.get('/',(req,res)=>res.send("Welcome " + usuario1 ))
export default app;


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Local en http://localhost:${PORT}`);
});

app.post('/crearusuario', async (req, res)) => {
  const user = req.body;
  if (!user.nombre || !user.password) {
      return res.status(400).json(message: "Debe completar todos los campos");
  }
}