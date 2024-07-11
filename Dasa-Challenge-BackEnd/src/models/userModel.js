import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const userModel = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_role: {
      type: DataTypes.INTEGER,
    },
    user_image: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);
