import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  doc_name: { type: String, required: true },
  doc_email: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  speciality: { type: String },
  description: { type: String },
  address: { type: String, required: true },
  avatar: { type: String },
  //   opening_hours: [{ type: mongoose.Schema.Types.ObjectId, ref: "Schedule" }],
  //   doc_appointments: [
  //     { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
  //   ],
  // last_login: { type: Date },
});

export const DoctorModel = mongoose.model("doctor", doctorSchema);
