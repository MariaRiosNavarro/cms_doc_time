/* eslint-disable react/prop-types */
import { useRef } from "react";

const AppointmentForm = ({ doctorId, patientId }) => {
  const dayRef = useRef();
  const timeStartRef = useRef();

  const addAppointment = async (e) => {
    e.preventDefault();

    const day = dayRef.current.value;
    const time = timeStartRef.current.value;

    const dayStart = new Date(`${day}T${time}`);

    const data = {
      dayStart,
      doctorIdRef: doctorId,
      patientIdRef: patientId,
    };

    console.log(data);

    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("Add appointment success");
      } else {
        console.error("Error");
      }
    } catch (error) {
      console.error("Network error", error);
    }
  };
  return (
    <>
      <form
        onSubmit={addAppointment}
        className="flex flex-col justify-center items-center gap-4"
      >
        <h3 className="text-3xl text-center bg-primary text-base-100 w-[100%] mb-4 p-4">
          Book an appointment
        </h3>
        <label className="font-bold" htmlFor="date">
          Day
        </label>
        <input ref={dayRef} required name="date" type="date" />
        <label className="font-bold" htmlFor="time" required>
          Time
        </label>
        <input ref={timeStartRef} name="time" type="time" />
        <input className="btn btn-primary" type="submit" value="send" />
      </form>
    </>
  );
};

export default AppointmentForm;
