import express from "express";
import multer from "multer";
import {
  getAllPatients,
  editOnePatient,
  getOnePatient,
} from "./patients.controller.js";
import { checkToken } from "../middlewares/auth.middleware.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });
export const router = new express.Router();

// Protected Routes

// For Now only User + Admin,
router.put("/:id", checkToken, upload.single("avatar"), editOnePatient);
router.get("/:id", checkToken, getOnePatient);
// but when I implement the appointments
// the corresponding doctor in the appointments
// will be able to see the patient's profile.

// Only Admin
router.get("/", checkToken, getAllPatients);

// users, whether doctors or patients,
// can only be deleted by the admin,
// in the users routes we delete der user
// from the role collection too.

// router.delete("/:id", checkToken, removeOneUser);
