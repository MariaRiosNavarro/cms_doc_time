import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  patient_firstname: { type: String },
  patient_lastname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  gender: { type: String },
  // issue: { type: String },
  // patient_appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
});

export const PatientModel = mongoose.model("patient", patientSchema);
