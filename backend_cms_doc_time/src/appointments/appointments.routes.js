import express from "express";
import multer from "multer";
import { checkToken } from "../middlewares/auth.middleware";
import {
  addAppointment,
  getAllAppointment,
  getOneAppointment,
  getAllAppointmentOneDoctor,
} from "./appointments.controller";

export const router = new express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/:roleId", checkToken, upload.none(), addAppointment);
router.get("/", getAllAppointment);
router.get("/:id", getOneAppointment);

router.get("/:roleId", getAllAppointmentOneDoctor);
