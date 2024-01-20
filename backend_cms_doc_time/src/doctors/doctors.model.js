import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  role: { type: String, enum: ["doctor"], required: true },
  name: { type: String },
  userIdRef: { type: String },
  email: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  // salt: { type: String, required: true },
  speciality: { type: String },
  description: { type: String },
  address: { type: String },
  avatar: { type: String },
  schedule: { type: Array },
  // schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: "Schedule" }],
  // doc_appointments: [
  //   { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
  // ],
  // last_login: { type: Date },
});

export const DoctorModel = mongoose.model("doctor", doctorSchema);
