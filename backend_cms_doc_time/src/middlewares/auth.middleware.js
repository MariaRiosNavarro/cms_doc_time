import { verifyToken } from "../auth/auth.service.js";

// use check token for the login routes, only for registered & login users can use this routes

export const checkToken = (req, res, next) => {
  const token = req.cookies.user_cms_auth;
  console.log("token in chektoken-----------", token);
  try {
    // We pass the payload, we may need it later in the route,
    //  so we add it to the req that goes further in the function

    req.payload = verifyToken(token);

    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).end();
  }
};

/**
 * We use this functions in addition to the checktoken middleware
 * this gives us access to req.payload in the function
 * It is important that checktoken is executed first and then onlyForAdmin//onlyForDoctor
 */

export const onlyForAdmin = (req, res, next) => {
  if (req.payload.role === "admin") {
    next();
  } else {
    res.status(401).end();
  }
};

export const onlyForDoctor = (req, res, next) => {
  if (req.payload.role === "doctor") {
    // res.roleIdRef;
    next();
  } else {
    res.status(401).end();
  }
};
