import express from "express";
import { getAllPatients } from "./users.controller.js";
import { checkToken } from "../middlewares/auth.middleware.js";

export const router = new express.Router();

// ONLY ADMIN
router.get("/", checkToken, getAllPatients);
// router.get("/:id", getOneUser);

// // Protected Routes with the login
// router.put("/:id", checkToken, editOneUser);
// // router.put("/:id", editOneUser);
// router.delete("/:id", checkToken, removeOneUser);
