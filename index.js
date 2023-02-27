import express from "express";
import dotenv from "dotenv";
import db from "./database/db-config.js";
import { Peminjam, UserKTP, Pengelola } from "./models/Association.js";

dotenv.config();

const app = express();

try {
  await db.sync();

  console.log("Db connected")
} catch (error) {
  console.log(error);
}

app.get('/', async (req, res) => {
  const peminjam = await Peminjam.findAll({
    include: {
      model: UserKTP
    }
  })

  const pengelola = await Pengelola.findAll({
    include: {
      model: UserKTP
    }
  });


  res.json({ peminjam, pengelola })
})

app.listen(process.env.PORT, () => {
  console.log(`Running at http://localhost:${process.env.PORT}`)
});