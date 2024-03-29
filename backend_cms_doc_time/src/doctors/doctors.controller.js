import { DoctorModel } from "./doctors.model.js";
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

// TODO: Remove Images fo cloudinary, dont work

// // check -> dont really work for now
// async function handleDelete(file) {
//   const res = await cloudinary.uploader.destroy(file, {
//     resource_type: "image",
//   });
//   return res;
// }

// -------------------------------------------------------------------------------FREE ROUTES
// --------------------------------------------------------------------GET ALL

export const getAllDoctors = async (req, res) => {
  try {
    //Wait & recibe Data
    const doctors = await DoctorModel.find();
    res
      .status(200)
      //Confirmation back & data to frontend
      .json({
        success: true,
        message: "Doctors successfully retrieved ✅",
        data: doctors,
      });
  } catch (error) {
    // Handle errors
    console.error("Error retrieving all Doctors -------🤒", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving all Doctors ❌",
      error,
    });
  }
};

// --------------------------------------------------------------------GET ONE

export const getOneDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    //Wait & recibe Data
    const doctor = await DoctorModel.findOne({ _id: id });
    // No Response handling

    if (!doctor) {
      return res.status(404).json({ message: "doctor not found" });
    }
    //Confirmation back  & data to frontend
    res.status(200).json({
      success: true,
      message: `doctor with id= ${id} sucessfully retrieved ✅`,
      data: doctor,
    });
  } catch (error) {
    // Handle errors
    console.error("Error retrieving all Doctors -------🤒", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving one doctor ❌",
      error,
    });
  }
};

// -------------------------------------------------------------------------------PROTECTED ROUTES
// --------------------------------------------------------------------EDIT ONE

export const editOneDoctor = async (req, res) => {
  try {
    console.log("PAYLOAD", req.payload);
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "doctor ID is missing" });
    }

    //save new data & add image if it is in the request
    const newDoctorData = req.body;

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
      // const oldData = await DoctorModel.findById(id);
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
      newDoctorData.avatar = cldRes.secure_url;
    }

    // Update Data

    const updatedoctor = await DoctorModel.findByIdAndUpdate(
      id,
      newDoctorData,
      {
        new: true,
      }
    );

    //  Confirmation back
    res.status(200).json({
      success: true,
      message: `doctor with id= ${id} successfully updated ✅`,
      data: newDoctorData,
    });
  } catch (error) {
    // Handle errors
    console.error("Error editing one doctor -------🤒", error);
    res
      .status(500)
      .json({ success: false, message: "Error editing one doctor ❌", error });
  }
};

// -------------------------------------------------------------------------------(FOR NOW) UNUSED ROUTES

// --------------------------------------------------------------------ADD ONE -
// -----(When the user registers (auth-routes) he/she is saved in 2 collections,
// -----the user collection and the role collection (doctor or patient),
// -----admin has not collection and it is only in the users collection )

export const addOneDoctor = async (req, res) => {
  try {
    const doctor = new DoctorModel(req.body);

    // // cloudinary
    // if (req.file) {
    //   const b64 = Buffer.from(req.file.buffer).toString("base64");
    //   let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    //   const cldRes = await handleUpload(dataURI);
    //   console.log(cldRes.secure_url);
    //   doctor.img = cldRes.secure_url;
    // }

    // Save the new doctor in db
    await doctor.save();

    //Confirmation back

    res
      .status(201)
      .json({
        success: true,
        message: "doctor successfully added ✅",
        data: doctor, //new
      })
      .end();

    // Error Handling
  } catch (error) {
    // Handle errors
    console.error("Error adding one doctor -------🤒", error);
    res.status(500).json({
      success: false,
      message: "Error adding one doctor ❌",
      error: error.message, //new
    });
  }
};

// --------------------------------------------------------------------DELETE ONE

//--- users, whether doctors or patients,
//--- can only be deleted by the admin,
//--- in the users routes we delete der user
//--- from the role collection too.

export const removeOneDoctor = async (req, res) => {
  try {
    console.log("PAYLOAD", req.payload);
    const { id } = req.params;

    // handle delete image -  check in the future - dont work for now

    // Save doctor to remove later the img
    // const doctor = await DoctorModel.findOne({ _id: id });
    // let image = doctor.avatar;
    // console.log(doctor);
    //
    // if (image)
    //   await cloudinary.destroy(image, {
    //     resource_type: "image",
    //   });

    await DoctorModel.findOneAndDelete({ _id: id });

    //sucess true
    res.status(200).json({
      success: true,
      message: `doctor with id= ${id} successfully deleted ✅`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error removing one doctor❌", error });
  }
};
