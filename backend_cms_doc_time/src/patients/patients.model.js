import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  role: { type: String, enum: ["patient"], required: true },
  name: { type: String },
  email: { type: String, required: true, unique: true },

  gender: { type: String },
  age: { type: Number },
  issue: { type: Number },

  // patient_appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
});

export const PatientModel = mongoose.model("patient", patientSchema);
