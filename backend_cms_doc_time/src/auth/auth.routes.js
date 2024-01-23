import express from "express";
import {
  login,
  logout,
  register,
  checkAndSendReqWithUserAndRole,
} from "./auth.controller.js";
import { checkToken } from "../middlewares/auth.middleware.js";

export const router = new express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);

// for secure routes, we use this route it in ours Protectors in Frontend,
//  we check the token & after that check the role in frontend.
router.get("/check", checkToken, checkAndSendReqWithUserAndRole);
