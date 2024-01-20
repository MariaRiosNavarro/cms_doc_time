import { verifyToken } from "../auth/auth.service.js";

export const checkToken = (req, res, next) => {
  const token = req.cookies.users_cms_auth;
  try {
    // We pass the payload, we may need it later in the route, so we add it to the req that goes further in the function
    req.users_cms_auth = verifyToken(token);
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).end();
  }
};

/**
 * We use this function in addition to the checktoken middleware
 * this gives us access to req.payload in the function
 * It is important that checktoken is executed first and then onlyForAdmin
 */
export function onlyForAdmin(req, res, next) {
  if (req.payload.role === "admin") {
    next();
  } else {
    res.status(401).end();
  }
}

export function onlyForAdminOrDoctor(req, res, next) {
  if (req.payload.role === "admin" || req.payload.role === "doctor") {
    next();
  } else {
    res.status(401).end();
  }
}
