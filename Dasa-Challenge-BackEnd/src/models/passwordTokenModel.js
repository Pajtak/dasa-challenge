const { DataTypes, Model } = require("sequelize");
const {sequelize} = require("../database/database");
const bcrypt = require('bcrypt');

class PasswordToken extends Model {
  static async validate(token) {
    try {
      
      const tokenRecord = await this.findOne({ where: { token: token } });

     
      if (tokenRecord && !tokenRecord.used) {
        return { status: true, token: tokenRecord };
      } else {
        return { status: false };
      }
    } catch (error) {
      throw new Error(`Erro ao validar o token: ${error.message}`);
    }
  }

  static async markAsUsed(token) {
    try {
      const tokenRecord = await this.findOne({ where: { token: token } });
      if (tokenRecord) {
        await tokenRecord.update({ used: true });
      }
    } catch (error) {
      console.error("Erro ao marcar token como utilizado:", error);
      throw error;
    }
  }
}

PasswordToken.init(
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
    sequelize,
    modelName: "PasswordToken",
    tableName: "passwordtokens",
    timestamps: false,
  }
);

module.exports = PasswordToken;
