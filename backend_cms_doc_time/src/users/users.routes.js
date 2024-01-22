import express from "express";
import multer from "multer";
import { checkToken, onlyForAdmin } from "../middlewares/auth.middleware.js";
import {
  addNewUser,
  getActualUser,
  getAllUser,
  deleteOneUser,
} from "./users.controller.js";

const upload = multer({ storage: new multer.memoryStorage() });
export const router = new express.Router();

router.get("/", checkToken, onlyForAdmin, getAllUser);
router.post("/", checkToken, onlyForAdmin, upload.none(), addNewUser);
router.get("/actual", checkToken, getActualUser);
router.delete("/:id", checkToken, deleteOneUser);
