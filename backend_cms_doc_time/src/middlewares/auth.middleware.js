import { verifyToken } from "../auth/auth.service.js";

export const checkToken = (req, res, next) => {
  const token = req.cookies.doctor_cms_auth;
  try {
    const payload = verifyToken(token);
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).end();
  }
};
