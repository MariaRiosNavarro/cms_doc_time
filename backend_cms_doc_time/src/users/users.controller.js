import { UserModel } from "./users.model.js";
import { PatientModel } from "../patients/patients.model.js";
import { DoctorModel } from "../doctors/doctors.model.js";

// // --------------------------------------------------------------------GET ALL

// export const getAllUsers = async (req, res) => {
//   try {
//     //Wait & recibe Data
//     const Users = await UserModel.find();
//     res
//       .status(200)
//       //Confirmation back & data to frontend
//       .json({
//         success: true,
//         message: "Users successfully retrieved ✅",
//         data: Users,
//       });
//   } catch (error) {
//     // Handle errors
//     console.error("Error retrieving all Users -------🤒", error);
//     res.status(500).json({
//       success: false,
//       message: "Error retrieving all Users ❌",
//       error,
//     });
//   }
// };

// // --------------------------------------------------------------------GET ONE

// export const getOneUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     //Wait & recibe Data
//     const user = await UserModel.findOne({ _id: id });
//     // No Response handling

//     if (!user) {
//       return res.status(404).json({ message: "user not found" });
//     }
//     //Confirmation back  & data to frontend
//     res.status(200).json({
//       success: true,
//       message: `user with id= ${id} sucessfully retrieved ✅`,
//       data: user,
//     });
//   } catch (error) {
//     // Handle errors
//     console.error("Error retrieving all Users -------🤒", error);
//     res.status(500).json({
//       success: false,
//       message: "Error retrieving one user ❌",
//       error,
//     });
//   }
// };

// // --------------------------------------------------------------------DELETE ONE

// export const removeOneUser = async (req, res) => {
//   try {
//     console.log("PAYLOAD", req.payload);
//     const { id } = req.params;
//     // Save user to remove later the img
//     const user = await UserModel.findOne({ _id: id });
//     let image = user.img;
//     // delete image -  check in the future - dont work for now
//     if (image) await handleDelete(image);
//     // Remove the Boot
//     await UserModel.findOneAndDelete({ _id: id });

//     //sucess true
//     res.status(200).json({
//       success: true,
//       message: `user with id= ${id} successfully deleted ✅`,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, message: "Error removing one user❌", error });
//   }
// };

// // --------------------------------------------------------------------EDIT ONE

// export const editOneUser = async (req, res) => {
//   try {
//     console.log("PAYLOAD", req.payload);
//     const { id } = req.params;

//     if (!id) {
//       return res.status(400).json({ error: "user ID is missing" });
//     }

//     //save new data & add image if it is in the request
//     const newUserData = req.body;
//     console.log("body..........", newUserData);
//     // cloudinary
//     if (req.file) {
//       const b64 = Buffer.from(req.file.buffer).toString("base64");
//       let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

//       // check if old Data has a Image
//       const oldData = await UserModel.findById(id);
//       const oldImage = oldData.img;

//       // remove the old image if the req has a new image
//       // error handling no oldimage need it

//       if (req.file && oldImage) {
//         await handleDelete(oldImage);
//       } else {
//         console.log("Image don´t change");
//       }

//       const cldRes = await handleUpload(dataURI);
//       console.log(cldRes.secure_url);
//       newUserData.img = cldRes.secure_url;
//     }

//     // Update Data

//     const updateuser = await UserModel.findByIdAndUpdate(id, newUserData, {
//       new: true,
//     });

//     //  Confirmation back
//     res.status(201).json({
//       success: true,
//       message: `user with id= ${id} successfully updated ✅`,
//       data: newUserData,
//     });
//   } catch (error) {
//     // Handle errors
//     console.error("Error editing one user -------🤒", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Error editing one user ❌", error });
//   }
// };

// --------------------------------------------------------------------ADD ONE

export const addNewUser = async (req, res) => {
  try {
    const user = new UserModel(req.body);
    user.role = "doctor";
    user.salt = createSalt();
    user.password = createHash(user.password, user.salt);
    await user.save();
    res.status(201).end();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

// --------------------------------------------------------------------Get ALL

export const getAllUser = async (req, res) => {
  try {
    const user = await UserModel.find();
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

// --------------------------------------------------------------------Get Actual Payload User

export const getActualUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.payload.userId);
    console.log("--------------user---------------🎃-", user);
    console.log(
      "---------------------------payload--------------------😱",
      req.payload
    );

    res.json(user.email);
  } catch (err) {
    console.log(
      "....-----------------------ERROR----------------------❌---",
      err
    );
    res.status(500).end();
  }
};

// ------------------------- remove

export const deleteOneUser = async (req, res) => {
  try {
    console.log("PAYLOAD", req.payload);
    const { id } = req.params;
    // Save user to remove later the img

    //Remove user of the Collection too before i delete from the main Collection
    const user = await UserModel.findOne({ _id: id });
    if (user.role === "doctor")
      await DoctorModel.findOneAndDelete({ _id: user.roleIdRef });
    if (user.role === "patient")
      await PatientModel.findOneAndDelete({ _id: user.roleIdRef });

    // TODO: Cloudinary remove dont work
    // let image = user.avatar;
    // // delete image -  check in the future - dont work for now
    // if (image) await handleDelete(image);

    // Remove the User
    await UserModel.findOneAndDelete({ _id: id });

    //sucess true
    res.status(200).json({
      success: true,
      message: `user with id= ${id} successfully deleted ✅`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error removing one user❌", error });
  }
};
