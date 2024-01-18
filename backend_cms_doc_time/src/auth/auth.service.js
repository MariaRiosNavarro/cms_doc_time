import jwt from "jsonwebtoken";
import { createHmac, randomBytes } from "node:crypto"; //ist in Node dabei

export const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5min" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const createHash = (password, salt) => {
  const hmac = createHmac("sha256", salt); //config,  algorithms we want
  hmac.update(password);
  return hmac.digest("hex"); //Here we encrypt the data
};

export const createSalt = () => {
  return randomBytes(12).toString("hex");
};
