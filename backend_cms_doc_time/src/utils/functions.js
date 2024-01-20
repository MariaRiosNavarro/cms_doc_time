import { PatientModel } from "../patients/patients.model.js";
import { DoctorModel } from "../doctors/doctors.model.js";

export const addRegisteredUserToCollection = async (role, data) => {
  if (role === "doctor") {
    const newDoctor = new DoctorModel(data);
    await newDoctor.save();
    return { roleIdRef: newDoctor._id };
  } else {
    const newPatient = new PatientModel(data);
    await newPatient.save();
    return { roleIdRef: newPatient._id };
  }
};
