import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL não definida nas variáveis de ambiente");
}

export const sequelize = new Sequelize(databaseUrl, {
  dialect: "mysql",
  logging: false,
});
