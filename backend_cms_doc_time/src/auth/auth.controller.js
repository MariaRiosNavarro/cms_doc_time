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

  // I save the collection Id (roleId)
  // to to manage the data of the users in
  // 2 collections (doctors & patients,
  // admins are only in the users collection)

  const token = createToken({
    userId: user._id,
    roleId: user.roleIdRef,
    role: user.role,
  });
  const userId = user._id;
  const roleIdRef = user.roleIdRef;

  //send a res with the jwt as httpOnly cookie
  // We package that token in a secure cookie in front of the frontend.
  //important this token name (here "user_cms_auth",
  // need you for the middleware checkToken->const token = req.cookies.user_cms_auth;)

  res
    .cookie("user_cms_auth", token, {
      httpOnly: true, //can not read it in client side/frontend - React con not do anything
      secure: true,
    })
    .json({
      id: userId,
      email: user.email,
      role: user.role,
      roleIdRef: roleIdRef,
    });
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

  // Use the same data to register in the role collection
  // with a reference of the id in the User collection,
  // to use in der detail pages & co

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
    email: req.body.email,
    role: req.body.role,
    userIdRef: updateRegistered.userIdRef,
  });
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("user_cms_auth");
    res.status(200).json({ message: "Logout success" });
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({ error: "server internal error" });
  }
};

// is only called with a valid jwt
export const checkAndSendReqWithUserAndRole = (req, res) => {
  res.json({
    userId: req.payload.userId,
    role: req.payload.role,
    roleId: req.payload.roleId,
  });
};
