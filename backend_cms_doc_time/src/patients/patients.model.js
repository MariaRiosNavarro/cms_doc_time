import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  role: { type: String, enum: ["patient"], required: true },
  name: { type: String },
  email: { type: String, required: true, unique: true },
  userIdRef: { type: String },
  gender: { type: String },
  age: { type: Number },
  issues: { type: Array },
  avatar: { type: String },
});

export const PatientModel = mongoose.model("patient", patientSchema);
