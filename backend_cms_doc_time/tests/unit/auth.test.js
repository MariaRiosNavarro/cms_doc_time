import "dotenv/config";
import { createSalt, createToken } from "../../src/auth/auth.service.js";

test("Do we get a JWT when we use create Token?", () => {
  const token = createToken({ doctor: "abcdef" });
  console.log("token is 🟢;", token);
}); // test the token in jwt.io

test("Check if the create salt function works", () => {
  const salt = createSalt();
  console.log(salt);
  expect(salt).toHaveLength(24);
});
