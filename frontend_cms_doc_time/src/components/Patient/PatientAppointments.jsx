/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const PatientAppointments = () => {
  const { patientId } = useParams();
  console.log(patientId);

  useEffect(() => {
    const fetchPatientAppointments = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL +
            "/api/appointments/patient-appointments/" +
            patientId
        );

        if (response.ok) {
          const data = await response.json();
          console.log(
            "data-------------------",
            data,
            "---------------------here"
          );
        } else {
          console.error("Error in obtaining patient appointments");
        }
      } catch (error) {
        console.error("Network error", error);
      }
    };

    fetchPatientAppointments();
  }, [patientId]);

  return <h2>PatientAppointments</h2>;
};

export default PatientAppointments;
