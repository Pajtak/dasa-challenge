const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const passwordTokenModel = sequelize.define(
  "PasswordToken",
  {
    token_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "passwordtokens",
    timestamps: false,
  }
);

module.exports = passwordTokenModel;
