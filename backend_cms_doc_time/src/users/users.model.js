import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  roleIdRef: { type: Object },
  role: {
    type: String,
    enum: ["admin", "doctor", "patient"],
    required: true,
  },
});

export const UserModel = mongoose.model("user", userSchema);
