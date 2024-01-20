import express from "express";
import {
  editOneDoctor,
  getOneDoctor,
  getAllDoctors,
  removeOneDoctor,
} from "./doctor.controller.js";
import { checkToken } from "../middlewares/auth.middleware.js";

export const router = new express.Router();

router.get("/", getAllDoctors);
router.get("/:id", getOneDoctor);

// Protected Routes with the login
router.put("/:id", checkToken, editOneDoctor);
// router.put("/:id", editOneDoctor);
router.delete("/:id", checkToken, removeOneDoctor);
