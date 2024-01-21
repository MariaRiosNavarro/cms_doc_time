import express from "express";
import multer from "multer";
import {
  editOneDoctor,
  getOneDoctor,
  getAllDoctors,
  removeOneDoctor,
} from "./doctors.controller.js";
import {
  checkToken,
  // checkAndSendReqWithUserAndRole,
  onlyForDoctor,
} from "../middlewares/auth.middleware.js";

export const router = new express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// FREE Routes
router.get("/", getAllDoctors);
router.get("/:id", getOneDoctor);

// Protected Routes with the login ONlY ADMIN + DOC - onlyForDoctor, dont work for now
router.put(
  "/:id",
  checkToken,
  onlyForDoctor,
  upload.single("avatar"),
  editOneDoctor
);
router.delete("/:id", checkToken, onlyForDoctor, removeOneDoctor);
