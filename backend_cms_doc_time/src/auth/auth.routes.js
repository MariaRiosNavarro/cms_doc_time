import express from "express";
import { login, logout, register } from "./auth.controller";

export const router = new express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);
