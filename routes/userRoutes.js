import { Router } from "express";
import { editAccount, inputKTP, insertTransactionPayment } from "../controllers/userController.js";
import transactionStorage from "../utils/storage/transactionStorage.js";

const userRoute = Router();

userRoute.post('/input-ktp', inputKTP);
userRoute.put('/edit-account', editAccount);
userRoute.post('/transactions/:transactionId/payment', [transactionStorage.array('files')], insertTransactionPayment);