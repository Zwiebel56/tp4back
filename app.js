import express from "express";
import authRouter from "./routes/auth.router.js";
import cancionesRouter from "./routes/canciones.router.js";
import escuchasRouter from "./routes/escuchas.router.js";

import cors from "cors";
import "dotenv/config";

import { Cancion } from './models/cancion.js';
 import { Usuario } from './models/usuario.js';
 import  Escucha  from './models/escucha.js';
 import { sequelize } from "./dbconfig.js";


const app = express();
app.use(express.json());
app.use(cors());

const defineModels = async () => {
  Usuario.belongsToMany(Cancion, {through: Escucha});
  Cancion.belongsToMany(Usuario, {through: Escucha});
  await sequelize.sync({ force: false, alter: false });
}

app.get("/", (_, res) => res.send("SpoTICfy API is running..."));
app.use("/auth", authRouter);
app.use("/cancion", cancionesRouter);
app.use("/escucha", escuchasRouter);
defineModels()


app.listen(process.env.PORT || 8000, () =>
  console.log(`Server is running on port ${process.env.PORT || 8000}`)
);

export default app;