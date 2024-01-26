/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  extractDay,
  extractMonth,
  extractTime,
  extractYear,
} from "../../utils/timeFunctions.js";

const PatientAppointments = () => {
  const { patientId } = useParams();
  console.log(patientId);
  const [appointments, setAppointments] = useState();

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
          setAppointments(data.data);
          console.log(data);
        } else {
          console.error("Error in obtaining patient appointments");
        }
      } catch (error) {
        console.error("Network error", error);
      }
    };

    fetchPatientAppointments();
  }, [patientId]);

  const colorStatus = (status) => {
    if (status === "waitingConfirmation") {
      return "text-warning";
    } else if (status === "confirmed") {
      return "text-success";
    } else {
      return "text-error";
    }
  };

  return (
    <section className="flex flex-col justify-center items-center mt-8">
      <h2 className="font-bold text-xl py-8">Patient Appointments</h2>
      <div>
        {appointments?.map((item) => (
          <div
            className="card card-body shadow-xl shadow-primary text-xl"
            key={item._id}
          >
            <h3>
              Day:{" "}
              <span className="pl-2 font-bold">
                {extractDay(item.dayStart)}
              </span>
              <span className="px-2 font-bold">
                {extractMonth(item.dayStart)}
              </span>
              <span className="font-bold">{extractYear(item.dayStart)}</span>
            </h3>

            <h3>
              Time:{" "}
              <span className="px-2 font-bold">
                {extractTime(item.dayStart)}
              </span>
            </h3>
            <h3>
              status:{" "}
              <span className={`px-2 font-bold ${colorStatus(item.status)}`}>
                {item.status}
              </span>
            </h3>

            <h3>
              Doctor: <span className="font-bold">{item.doctorIdRef.name}</span>
            </h3>
            <h3>
              Speziality:{" "}
              <span className="font-bold">{item.doctorIdRef.speciality}</span>
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PatientAppointments;
