import express from "express";
import dotenv from "dotenv";
import db from "./database/db-config.js";
import { User, UserKTP } from "./models/Association.js";

dotenv.config();

const app = express();

try {
  await db.sync();

  console.log("Db connected")
} catch (error) {
  console.log(error);
}

app.get('/', async (req, res) => {
  


  res.json({ peminjam, pengelola })
})

app.listen(process.env.PORT, () => {
  console.log(`Running at http://localhost:${process.env.PORT}`)
});