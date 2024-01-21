import express from "express";
import {
  login,
  logout,
  register,
  checkAndSendReqWithUserAndRole,
} from "./auth.controller.js";
import {
  checkToken,
  // addRegisteredUserToCollection,
} from "../middlewares/auth.middleware.js";

export const router = new express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);

// for secure routes, we use it in the Protector in Frontend, we check the token, and later in the
// checkAndSendReqWithUserAndRole give the req data
router.get("/check", checkToken, checkAndSendReqWithUserAndRole);
