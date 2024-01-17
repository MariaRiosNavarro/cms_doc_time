import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import morgan from "morgan";
import { router as authRouter } from "./auth/auth.routes.js";

await mongoose.connect(process.env.MONGO_ATLAS_URI);

console.log("hey");

export const app = express();

// app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
