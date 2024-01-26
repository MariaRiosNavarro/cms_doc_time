import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  //only Reference
  // doctorIdRef: mongoose.Schema.Types.ObjectId, //Only id ref
  // patientIdRef: mongoose.Schema.Types.ObjectId,//Only id ref
  doctorIdRef: { type: mongoose.Types.ObjectId, ref: "doctors" }, //complete Document
  patientIdRef: { type: mongoose.Types.ObjectId, ref: "patients" }, //complete Document
  status: {
    type: String,
    enum: ["waitingConfirmation", "confirmed", "cancelled"],
    default: "waitingConfirmation",
    required: true,
  }, //status change only doctor
  dayStart: { type: Date }, //put the patient
  dayEnd: { type: Date }, // change only the Doctor
});

export const AppointmentModel = mongoose.model(
  "appointment",
  appointmentSchema
);
