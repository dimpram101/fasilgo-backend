import express from "express";
import dotenv from "dotenv";
import db from "./database/db-config.js";
import { Facility, Review, Peminjam } from "./models/Association.js";

dotenv.config();

const app = express();

try {
  // await db.authenticate();
  // db.drop();
  Peminjam.sync();
  Facility.sync();
  Review.sync();

  console.log("Db connected")
} catch (error) {
  console.log(error);
}

app.get('/', async (req, res) => {
  const facility = await Facility.findAll({
    include: {
      model: Review
    }
  })

  const peminjam = await Peminjam.findAll({
    include: {
      model: Review
    }
  })

  const review = await Review.findAll({
    include: [Facility, Peminjam]
  })

  res.json({ facility, peminjam, review })
})

app.listen(process.env.PORT, () => {
  console.log(`Running at http://localhost:${process.env.PORT}`)
});