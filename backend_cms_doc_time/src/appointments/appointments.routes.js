import express from "express";
import multer from "multer";
import { checkToken } from "../middlewares/auth.middleware.js";
import {
  addAppointment,
  getAllAppointment,
  getOneAppointment,
  getAllAppointmentOneDoctor,
  getAllAppointmentOnePatient,
} from "./appointments.controller.js";

export const router = new express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.none(), addAppointment);
router.get("/", getAllAppointment);
router.get("/:id", getOneAppointment);

router.get("/doctor-appointments/:doctorId", getAllAppointmentOneDoctor);
router.get("/patient-appointments/:patientId", getAllAppointmentOnePatient);
