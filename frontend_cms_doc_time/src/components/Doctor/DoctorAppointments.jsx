/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  extractDay,
  extractMonth,
  extractTime,
  extractYear,
} from "../../utils/timeFunctions.js";

const DoctorAppointments = () => {
  const { doctorId } = useParams();
  const [appointments, setAppointments] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchDoctorAppointments = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL +
            "/api/appointments/doctor-appointments/" +
            doctorId
        );

        if (response.ok) {
          const data = await response.json();
          setAppointments(data.data);
          console.log(data);
        } else {
          console.error("Error in obtaining doctor appointments");
        }
      } catch (error) {
        console.error("Network error", error);
      }
    };

    fetchDoctorAppointments();
  }, [doctorId, refresh]);

  const colorStatus = (status) => {
    if (status === "waitingConfirmation") {
      return "text-warning";
    } else if (status === "confirmed") {
      return "text-success";
    } else {
      return "text-error";
    }
  };

  const changeStatusAppointment = async (string, id) => {
    let body = { status: string };
    console.log(body);
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/appointments/" + id,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      console.log("yes");
      setRefresh((prev) => !prev);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center mt-8">
      <h2 className="font-bold text-xl py-8">Doctor Appointments</h2>
      <div>
        {appointments?.map((item) => (
          <div
            className="card card-body shadow-xl shadow-primary text-xl"
            key={item._id}
          >
            <h3>
              Day:
              <span className="pl-2 font-bold">
                {extractDay(item.dayStart)}
              </span>
              <span className="px-2 font-bold">
                {extractMonth(item.dayStart)}
              </span>
              <span className="font-bold">{extractYear(item.dayStart)}</span>
            </h3>

            <h3>
              Time:
              <span className="px-2 font-bold">
                {extractTime(item.dayStart)}
              </span>
            </h3>
            <h3>
              status:
              <span className={`px-2 font-bold ${colorStatus(item.status)}`}>
                {item.status}
              </span>
            </h3>

            <h3>
              Patient:
              <span className="font-bold">{item.patientIdRef.name}</span>
            </h3>
            <h3 className="pb-4">
              Patient Age:
              <span className="font-bold">{item.patientIdRef.age}</span>
            </h3>

            <button
              onClick={() => changeStatusAppointment("confirmed", item._id)}
              className="btn btn-success"
            >
              Confirm
            </button>
            <button
              onClick={() => changeStatusAppointment("cancelled", item._id)}
              className="btn btn-error"
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DoctorAppointments;
