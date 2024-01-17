import jwt from "jsonwebtoken";
import { createHmac } from "node:crypto"; //ist in Node dabei

export const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2min" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const createHash = (password, salt) => {
  const hmac = createHmac("sha256", salt); //config, wich algorithmus we want
  hmac.update(password);
  return hmac.digest("hex"); //Here we encript the data
};
