import { PatientModel } from "./patients.model.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// --------------handle Images-----------cloudinary functions

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "image",
  });
  return res;
}

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

// --------------------------------------------------------------------GET ONE

export const getOnePatient = async (req, res) => {
  try {
    const { id } = req.params;
    //Wait & recibe Data
    const patient = await PatientModel.findOne({ _id: id });
    // No Response handling

    console.log(patient);

    if (!patient) {
      return res.status(404).json({ message: "patient not found" });
    }
    //Confirmation back  & data to frontend
    res.status(200).json({
      success: true,
      message: `patient with id= ${id} sucessfully retrieved ✅`,
      data: patient,
    });
  } catch (error) {
    // Handle errors
    console.log(error);

    console.error("Error retrieving all Patients -------🤒", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving one patient ❌",
      error,
    });
  }
};

// -------------------------------------------------------------------------------PROTECTED ROUTES
// --------------------------------------------------------------------EDIT ONE

export const editOnePatient = async (req, res) => {
  try {
    console.log("PAYLOAD", req.payload);
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "patient ID is missing" });
    }

    //save new data & add image if it is in the request
    const newPatientData = req.body;

    console.log("------------------BACKEND BODY", req.body);

    if (req.file) {
      console.log("file");
    } else {
      console.log("no file");
    }
    // cloudinary
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

      // -- Todo: Handle Delete function fron cloudinary dont work for now
      // -- check if old Data has a Image
      // const oldData = await PatientModel.findById(id);
      // const oldImage = oldData.img;
      // -  remove the old image if the req has a new image
      // -   error handling no oldimage need it
      // if (req.file && oldImage) {
      //   await handleDelete(oldImage);
      // } else {
      //   console.log("Don´t delete anything");
      // }

      const cldRes = await handleUpload(dataURI);
      console.log(cldRes.secure_url);
      newPatientData.avatar = cldRes.secure_url;
    }

    // Update Data

    const updatepatient = await PatientModel.findByIdAndUpdate(
      id,
      newPatientData,
      {
        new: true,
      }
    );

    //  Confirmation back
    res.status(200).json({
      success: true,
      message: `patient with id= ${id} successfully updated ✅`,
      data: newPatientData,
    });
  } catch (error) {
    // Handle errors
    console.error("Error editing one patient -------🤒", error);
    res
      .status(500)
      .json({ success: false, message: "Error editing one patient ❌", error });
  }
};

// export const editOnePatient = async (req, res) => {
//   try {
//     console.log("PAYLOAD", req.payload);
//     const { id } = req.params;

//     if (!id) {
//       return res.status(400).json({ error: "patient ID is missing" });
//     }

//     // Guardar nuevos datos y agregar la imagen si está en la solicitud
//     const newPatientData = req.body;

//     console.log("------------------BACKEND BODY", req.body);

//     // Manejo de archivos
//     try {
//       if (req.file) {
//         const b64 = Buffer.from(req.file.buffer).toString("base64");
//         const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

//         // Cloudinary
//         const cldRes = await handleUpload(dataURI);
//         console.log(cldRes.secure_url);
//         newPatientData.avatar = cldRes.secure_url;
//       }
//     } catch (fileError) {
//       console.error("Error handling file upload -------🤒", fileError);
//       throw fileError; // Re-lanza el error para que se maneje en el bloque catch exterior
//     }

//     // Actualizar datos
//     try {
//       const updatepatient = await PatientModel.findByIdAndUpdate(
//         id,
//         newPatientData,
//         {
//           new: true,
//         }
//       );

//       if (!updatepatient) {
//         return res.status(404).json({
//           success: false,
//           message: `Patient with ID ${id} not found ❌`,
//         });
//       }

//       // Confirmación de éxito
//       res.status(200).json({
//         success: true,
//         message: `Patient with ID ${id} successfully updated ✅`,
//         data: newPatientData,
//       });
//     } catch (updateError) {
//       console.error("Error updating patient -------🤒", updateError);
//       res.status(500).json({
//         success: false,
//         message: `Error updating patient with ID ${id} ❌`,
//         error: updateError.message,
//       });
//     }
//   } catch (error) {
//     // Manejo de errores generales
//     console.error("Error editing one patient -------🤒", error);
//     res.status(500).json({
//       success: false,
//       message: "Error editing one patient ❌",
//       error: error.message,
//     });
//   }
// };

// export const editOnePatient = async (req, res) => {
//   try {
//     console.log("PAYLOAD", req.payload);
//     const { id } = req.params;

//     if (!id) {
//       return res.status(400).json({ error: "patient ID is missing" });
//     }

//     // Guardar nuevos datos y agregar la imagen si está en la solicitud
//     const newPatientData = req.body;

//     console.log("------------------BACKEND BODY", req.body);

//     // Manejo de archivos
//     try {
//       if (req.file) {
//         const b64 = Buffer.from(req.file.buffer).toString("base64");
//         const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

//         // Cloudinary
//         const cldRes = await handleUpload(dataURI);
//         console.log(cldRes.secure_url);
//         newPatientData.avatar = cldRes.secure_url;
//       }
//     } catch (fileError) {
//       console.error("Error handling file upload -------🤒", fileError);
//       return res.status(500).json({
//         success: false,
//         message: "Error handling file upload ❌",
//         error: fileError.message,
//       });
//     }

//     // Actualizar datos
//     try {
//       const updatepatient = await PatientModel.findByIdAndUpdate(
//         id,
//         newPatientData,
//         { new: true }
//       );

//       if (!updatepatient) {
//         return res.status(404).json({
//           success: false,
//           message: `Patient with ID ${id} not found ❌`,
//         });
//       }

//       // Confirmación de éxito
//       res.status(200).json({
//         success: true,
//         message: `Patient with ID ${id} successfully updated ✅`,
//         data: newPatientData,
//       });
//     } catch (updateError) {
//       console.error("Error updating patient -------🤒", updateError);
//       return res.status(500).json({
//         success: false,
//         message: `Error updating patient with ID ${id} ❌`,
//         error: updateError.message,
//       });
//     }
//   } catch (error) {
//     // Manejo de errores generales
//     console.error("Error editing one patient -------🤒", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error editing one patient ❌",
//       error: error.message,
//     });
//   }
// };
