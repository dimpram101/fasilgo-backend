import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(process.env.DB_NAME, "root", process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  timezone: '+08:00'
})

export default db;