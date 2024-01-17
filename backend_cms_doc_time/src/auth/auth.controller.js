import { DoctorModel } from "../doctors/doctor.model.js";
import { createHash, createToken } from "./auth.service.js";

export const login = async (req, res) => {
  const doctor = await DoctorModel.find({ email: req.body.email });
  if (!doctor) return res.status(401).end(); //check if the doctor has a email
  if (doctor.password !== createHash(req.body.password, doctor.salt))
    //check if the doctor use the correct password
    return res.status(401).end();
  //the doctor.password is the encrypted password in db, not the original.

  //If all the checks have been passed, it means that
  //our doctor is correct and validate
  //so we can give him/her a token.

  const token = createToken({ doctor: doctor._id });

  //send a res with the jwt as httpOnly cookie
  // We package that token in a secure cookie in front of the frontend.
  res
    .cookie("doctor_cms_auth", token, {
      httpOnly: true, //can not read it in client side/frontend - React con not do anything
      secure: true,
    })
    .end();
};

export const register = async (req, res) => {
  const doctor = await DoctorModel.create(req.body);
  console.log("doctor register", doctor);

  res.end();
};

export const logout = async (req, res) => {
  res.end();
};
