import { DoctorModel } from "./doctor.model.js";
import { v2 as cloudinary } from "cloudinary";

// const cloud_url = process.env.CLOUDINARY_URL;

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

// check -> dont really work for now
async function handleDelete(file) {
  const res = await cloudinary.uploader.destroy(file, {
    resource_type: "image",
  });
  return res;
}

// --------------------------------------------------------------------GET ALL

export const getAllDoctors = async (req, res) => {
  try {
    //Wait & recibe Data
    const Doctors = await DoctorModel.find();
    res
      .status(200)
      //Confirmation back & data to frontend
      .json({
        success: true,
        message: "Doctors successfully retrieved ✅",
        data: Doctors,
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

// --------------------------------------------------------------------ADD ONE

// export const addOneDoctor = async (req, res) => {
//   try {
//     const doctor = new DoctorModel(req.body);

//     // cloudinary
//     if (req.file) {
//       const b64 = Buffer.from(req.file.buffer).toString("base64");
//       let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
//       const cldRes = await handleUpload(dataURI);
//       console.log(cldRes.secure_url);
//       doctor.img = cldRes.secure_url;
//     }

//     // Save the new doctor in db
//     await doctor.save();

//     //Confirmation back

//     res
//       .status(201)
//       .json({
//         success: true,
//         message: "doctor successfully added ✅",
//         data: doctor, //new
//       })
//       .end();

//     // Error Handling
//   } catch (error) {
//     // Handle errors
//     console.error("Error adding one doctor -------🤒", error);
//     res.status(500).json({
//       success: false,
//       message: "Error adding one doctor ❌",
//       error: error.message, //new
//     });
//   }
// };

// --------------------------------------------------------------------DELETE ONE

export const removeOneDoctor = async (req, res) => {
  try {
    console.log("PAYLOAD", req.payload);
    const { id } = req.params;
    // Save doctor to remove later the img
    const doctor = await DoctorModel.findOne({ _id: id });
    let image = doctor.img;
    // delete image -  check in the future - dont work for now
    if (image) await handleDelete(image);
    // Remove the Boot
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
    console.log("body..........", newDoctorData);
    // cloudinary
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

      // check if old Data has a Image
      const oldData = await DoctorModel.findById(id);
      const oldImage = oldData.img;

      // remove the old image if the req has a new image
      // error handling no oldimage need it

      if (req.file && oldImage) {
        await handleDelete(oldImage);
      } else {
        console.log("Image don´t change");
      }

      const cldRes = await handleUpload(dataURI);
      console.log(cldRes.secure_url);
      newDoctorData.img = cldRes.secure_url;
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
    res.status(201).json({
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
