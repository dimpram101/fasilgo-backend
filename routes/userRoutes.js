import { Router } from "express";
import { editAccount, inputKTP } from "../controllers/userController.js";

const userRoute = Router();

userRoute.post('/input-ktp', inputKTP);
userRoute.put('/edit-account', editAccount);