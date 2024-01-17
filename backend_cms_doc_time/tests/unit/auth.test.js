import "dotenv/config";
import { createToken } from "../../src/auth/auth.service.js";

test("Do we get a JWT when we use create Token?", () => {
  const token = createToken({ doctor: "abcdef" });
  console.log("token is 🟢;", token);
}); // test the token in jwt.io
