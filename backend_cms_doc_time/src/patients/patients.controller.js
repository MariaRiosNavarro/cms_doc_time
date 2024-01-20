import { PatientModel } from "./patients.model";

// --------------------------------------------------------------------GET ALL

export const getAllPatients = async (req, res) => {
  try {
    //Wait & recibe Data
    const patients = await PatientModel.find();
    res
      .status(200)
      //Confirmation back & data to frontend
      .json({
        success: true,
        message: "Patients successfully retrieved ✅",
        data: patients,
      });
  } catch (error) {
    // Handle errors
    console.error("Error retrieving all Patients -------🤒", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving all Patients ❌",
      error,
    });
  }
};
