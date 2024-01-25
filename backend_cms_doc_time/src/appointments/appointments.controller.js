import { AppointmentModel } from "./appointments.model.js";

export const addAppointment = async (req, res) => {
  try {
    const { roleId } = req.params;
    const appointmentInfo = req.body;
    if (!appointmentInfo) {
      throw new Error("Request body is undefined or not an object");
    }

    //   handle date for start

    if (appointmentInfo && appointmentInfo.dayStart) {
      appointmentInfo.dayStart = new Date(appointmentInfo.dayStart);
    }

    //   handle date for end

    if (appointmentInfo && appointmentInfo.dayEnd) {
      appointmentInfo.dayEnd = new Date(appointmentInfo.dayEnd);
    }

    appointmentInfo.doctorIdRef = roleId;

    const appointment = new AppointmentModel(appointmentInfo);

    await appointment.save();

    // Confirmation back

    res
      .status(201)
      .json({ success: true, message: "Appointment successfully added  ✅" })
      .end();
  } catch (error) {
    console.error("Error addding one appointment");
    res
      .status(500)
      .json({ success: false, message: "Error adding one Reservation", error });
  }
};

export const getAllAppointment = async (req, res) => {
  try {
    //Wait & recibe Data
    const appointments = await AppointmentModel.find();
    res
      .status(200)
      //Confirmation back & data to frontend
      .json({
        success: true,
        message: "Appointments successfully retrieved ✅",
        data: appointments,
      });
  } catch (error) {
    // Handle errors
    console.error("Error retrieving all appointments");
    res.status(500).json({
      success: false,
      message: "Error retrieving all appointments",
      error,
    });
  }
};

export const getOneAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    //Wait & recibe Data & populate
    const appointment = await AppointmentModel.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    //Confirmation back  & data to frontend

    res.status(200).json({
      success: true,
      boat: appointment,
      message: `Appointment with id= ${id} sucessfully retrieved ✅`,
    });
  } catch (error) {
    console.error("Error getting one appointment");
    res.status(500).json({
      success: false,
      message: "Error retrieving one appointment",
      error,
    });
  }
};

export const getAllAppointmentOneDoctor = async (req, res) => {
  try {
    const { roleId } = req.params;
    const appointmentsOnePerson = await AppointmentModel.find(
      (roleId = doctorIdRef)
    );
    res.status(200).json({
      success: true,
      boat: appointmentsOnePerson,
      message: `Appointment from doctor= ${id} sucessfully retrieved ✅`,
    });
  } catch (error) {
    console.error("Error getting appointments");
    res.status(500).json({
      success: false,
      message: "Error retrieving appointments",
      error,
    });
  }
};
