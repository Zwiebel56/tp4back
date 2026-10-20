import express from "express";
import cors from "cors";
import "dotenv/config";

import { sequelize } from "./dbconfig.js";
import Usuario from "./models/usuario.js";
import Cancion from "./models/cancion.js";
import Escucha from "./models/escucha.js";

import authRouter from "./routes/auth.router.js";
import cancionesRouter from "./routes/canciones.router.js";
import escuchasRouter from "./routes/escuchas.router.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_, res) => res.send("SpoTICfy API is running..."));
app.use("/auth", authRouter);
app.use("/cancion", cancionesRouter);
app.use("/escucha", escuchasRouter);

const defineModels = async () => {
  try {
    Usuario.belongsToMany(Cancion, { through: Escucha, foreignKey: "usuario_id" });
    Cancion.belongsToMany(Usuario, { through: Escucha, foreignKey: "cancion_id" });

    Usuario.hasMany(Escucha, { foreignKey: "usuario_id" });
    Escucha.belongsTo(Usuario, { foreignKey: "usuario_id" });

    Cancion.hasMany(Escucha, { foreignKey: "cancion_id" });
    Escucha.belongsTo(Cancion, { foreignKey: "cancion_id" });

    await sequelize.sync({ force: false, alter: false });
    console.log("Modelos y relaciones sincronizados correctamente.");

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error al sincronizar la base de datos:", error);
  }
};

defineModels();

export default app;