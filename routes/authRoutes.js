import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import { isEmailExist } from "../middlewares/authMiddleware.js";
import verifyToken from "../middlewares/verifyToken.js";

const authRoute = Router();

authRoute.post('/login', login);
authRoute.post('/register', [isEmailExist], register);
authRoute.post('/logout', [verifyToken], logout);

export default authRoute;