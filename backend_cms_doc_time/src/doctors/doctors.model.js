import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  role: { type: String, enum: ["doctor"], required: true },
  name: { type: String },
  userIdRef: { type: String },
  email: { type: String, required: true, unique: true },
  speciality: { type: String },
  description: { type: String },
  address: { type: String },
  avatar: { type: String },
  schedule: { type: Array },
});

export const DoctorModel = mongoose.model("doctor", doctorSchema);
