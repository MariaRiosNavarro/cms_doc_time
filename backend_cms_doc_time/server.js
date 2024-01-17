import express from "express";
import { router as authRouter } from "./src/auth/auth.routes.js";

const app = express();

app.use("/api/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log("Port is: " + process.env.PORT);
});
