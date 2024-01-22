import { UserModel } from "./user.model.js";

export async function getUserById(id) {
  const user = UserModel.findById(id);
  return user;
}
