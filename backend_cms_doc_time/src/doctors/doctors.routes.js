import express from "express";
import multer from "multer";
import {
  editOneDoctor,
  getOneDoctor,
  getAllDoctors,
} from "./doctors.controller.js";
import { checkToken, onlyForDoctor } from "../middlewares/auth.middleware.js";

export const router = new express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// FREE Routes
router.get("/", getAllDoctors);
router.get("/:id", getOneDoctor);

// Protected Routes
router.put(
  "/:id",
  checkToken,
  onlyForDoctor,
  upload.single("avatar"),
  editOneDoctor
);

// users, whether doctors or patients,
//  can only be deleted by the admin,
// in the users routes we delete der user
//  from the role collection too.

// router.delete("/:id", checkToken, onlyForAdmin, removeOneDoctor);
