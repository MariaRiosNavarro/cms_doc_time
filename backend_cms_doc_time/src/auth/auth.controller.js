import { UserModel } from "../users/users.model.js";
import { createHash, createToken, createSalt } from "./auth.service.js";

export const login = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) return res.status(401).end(); //check if the user has a email
  if (user.password !== createHash(req.body.password, user.salt))
    //check if the user use the correct password
    return res.status(401).end();
  //the user.password is the encrypted password in db, not the original.

  //If all the checks have been passed, it means that
  //our user is correct and validate
  //so we can give him/her a token.

  const token = createToken({ user: user._id, role: user.role });
  const userId = user._id;

  //send a res with the jwt as httpOnly cookie
  // We package that token in a secure cookie in front of the frontend.
  res
    .cookie("user_cms_auth", token, {
      httpOnly: true, //can not read it in client side/frontend - React con not do anything
      secure: true,
    })
    .json({ id: userId, email: user.email, role: user.role });
};

export const register = async (req, res) => {
  const registeredUserEmail = await UserModel.findOne({
    email: req.body.email,
  }); //check email
  if (registeredUserEmail) return res.status(401).end();
  const newUser = new UserModel(req.body); //create user
  newUser.salt = createSalt();
  newUser.password = createHash(newUser.password, newUser.salt);
  await newUser.save();

  console.log(req.body.email);

  res
    .status(201)
    .json({
      success: true,
      message: "User successfully registered ✅",
      // data: newUser,
    })
    .end();
};

export const logout = async (req, res) => {
  res.end();
};

// is only called with a valid jwt
export const checkAndSendReqWithUserAndRole = (req, res) => {
  res.json({ user: req.payload.user, role: req.payload.role });
};
