import express from "express";
import {
  editOneDoctor,
  getOneDoctor,
  getAllDoctors,
  removeOneDoctor,
} from "./doctors.controller.js";
import {
  checkToken,
  checkAndSendReqWithUserAndRole,
  onlyForAdminOrDoctor,
} from "../middlewares/auth.middleware.js";

export const router = new express.Router();

// FREE Routes
router.get("/", getAllDoctors);
router.get("/:id", getOneDoctor);

// Protected Routes with the login ONlY ADMIN + DOC
router.put("/:id", checkToken, onlyForAdminOrDoctor, editOneDoctor);
router.delete("/:id", checkToken, onlyForAdminOrDoctor, removeOneDoctor);
