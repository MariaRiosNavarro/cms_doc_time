import { verifyToken } from "../auth/auth.service.js";

export const checkToken = (req, res, next) => {
  const token = req.cookies.doctor_cms_auth;
  try {
    // We pass the payload, we may need it later in the route, so we add it to the req that goes further in the function
    req.doctor_cms_auth = verifyToken(token);
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).end();
  }
};
