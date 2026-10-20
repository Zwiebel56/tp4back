import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dbconfig.js";

export class Usuario extends Model {}

Usuario.init(
  {
    userid: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "usuario",
    tableName: "usuario",
    timestamps: false,
  }
);

export default Usuario;