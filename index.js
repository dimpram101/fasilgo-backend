import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoutes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import verifyToken from "./middlewares/verifyToken.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authRoute);

app.get('/', [verifyToken], async (req, res) => {
  res.status(200).json({ msg: "OK" })
})

app.listen(process.env.PORT, () => {
  console.log(`Running at http://localhost:${process.env.PORT}`)
});