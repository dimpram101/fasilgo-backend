import { Router } from "express";
import { createTransaction, editAccount, inputKTP, insertTransactionPayment } from "../controllers/userController.js";
import transactionStorage from "../utils/storage/transactionStorage.js";
import ktpStorage from "../utils/storage/userKTPStorage.js";

const userRoute = Router();

userRoute.post('/input-ktp', [ktpStorage.single('file')], inputKTP);
userRoute.put('/edit-account', editAccount);
userRoute.post('/transactions/:transactionId/payment', [transactionStorage.array('files')], insertTransactionPayment);

userRoute.post('/transactions', createTransaction)
userRoute.post('/transactions/:id/payment', insertTransactionPayment)

export default userRoute;