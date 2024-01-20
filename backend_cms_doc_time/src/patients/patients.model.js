import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  role: { type: String, enum: ["patient"], required: true },
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  gender: { type: String },
  age: { type: Number },
  // issue: { type: String },
  // patient_appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
});

export const PatientModel = mongoose.model("patient", patientSchema);
