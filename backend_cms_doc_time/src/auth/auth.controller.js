import { UserModel } from "../users/users.model.js";
import { createHash, createToken, createSalt } from "./auth.service.js";
import { addRegisteredUserToCollection } from "../utils/functions.js";

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

  // Use the same data to register in the role collection with a reference of the id in the User collection, to use in der detail pages & co
  let email = req.body.email;
  let role = req.body.role;
  let userIdRef = newUser._id;
  let registerInCollection = { email: email, role: role, userIdRef: userIdRef };

  let roleIdRef = await addRegisteredUserToCollection(
    role,
    registerInCollection
  );

  // Update registered Email with the collection reference id

  const updateRegistered = await UserModel.findByIdAndUpdate(
    userIdRef,
    roleIdRef,
    {
      new: true,
    }
  );

  res.status(201).json({
    // success: true,
    // message: "User successfully registered ✅",
    email: req.body.email,
    role: req.body.role,
    userIdRef: updateRegistered.userIdRef,
  });
};

export const logout = async (req, res) => {
  res.end();
};

// is only called with a valid jwt
export const checkAndSendReqWithUserAndRole = (req, res) => {
  res.json({ user: req.payload.user, role: req.payload.role });
};
