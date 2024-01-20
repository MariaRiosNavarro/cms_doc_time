// import express from "express";
// import {
//   editOneUser,
//   getOneUser,
//   getAllUsers,
//   removeOneUser,
// } from "./users.controller.js";
// import { checkToken } from "../middlewares/auth.middleware.js";

// export const router = new express.Router();

// // Protected Routes with the login - ONLY ADMIN
// router.get("/", checkToken, getAllUsers);
// router.get("/:id", checkToken, getOneUser);
// router.put("/:id", checkToken, editOneUser);
// router.delete("/:id", checkToken, removeOneUser);

import express from "express";
import multer from "multer";
import { checkToken, onlyForAdmin } from "../middlewares/auth.middleware.js";
import { addNewUser, getActualUser, getAllUser } from "./users.controller.js";

const upload = multer({ storage: new multer.memoryStorage() });
export const router = new express.Router();

router.get("/", checkToken, onlyForAdmin, getAllUser);
router.post("/", checkToken, onlyForAdmin, upload.none(), addNewUser);
router.get("/actual", checkToken, getActualUser);
