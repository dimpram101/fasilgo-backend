import { Router } from "express";
import {
  addFacilityPhoto,
  deleteFacility,
  deleteFacilityPhoto,
  editFacility,
  getAllFacilities, 
  getFacilityById, 
  insertNewFacility, 
  createAkunPengelola, 
  getAllTransaction, 
  getTransactionById
} from "../controllers/adminController.js";

const adminRoutes = Router();

adminRoutes.post('/create-akun-pengelola', createAkunPengelola)

adminRoutes.get('/facility', getAllFacilities)
adminRoutes.get('/facility/:id', getFacilityById)
adminRoutes.post('/create-new-facility', insertNewFacility)
adminRoutes.put('/facility/:id', editFacility)
adminRoutes.delete('/facility/:id', deleteFacility)

adminRoutes.post('/facility/:id/photo', addFacilityPhoto)
adminRoutes.delete('/facility/:id/photo/:photoId', deleteFacilityPhoto)

adminRoutes.get('/transactions', getAllTransaction)
adminRoutes.get('/transactions/:id', getTransactionById)

export default adminRoutes;