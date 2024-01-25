import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  //only Reference
  doctorIdRef: mongoose.Schema.Types.ObjectId,
  patientIdRef: mongoose.Schema.Types.ObjectId,
  //   documentDoctor: { type: mongoose.Types.ObjectId, ref: "doctors" },//complete Document
  status: {
    type: String,
    enum: ["waitingConfirmation", "confirmed", "cancelled"],
    default: "waitingConfirmation",
    required: true,
  },
  dayStart: { type: Date },
  dayEnd: { type: Date },
});

export const AppointmentModel = mongoose.model(
  "appointment",
  appointmentSchema
);
