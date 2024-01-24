/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Loading from "../General/Loading";
import { useNavigate } from "react-router-dom";

const PatientDetail = ({ id }) => {
  const [patient, setPatient] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOnePatient = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/api/patients/" + id
        );
        const responseData = await response.json();
        if (!response.ok) {
          console.log("response no", responseData);
        }
        setLoading(false);
        setPatient(responseData.data);
        console.log(responseData);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchOnePatient();
  }, []);

  const placeholder = "https://picsum.photos/300/300";
  const checkAppointment = () => {
    navigate("/patient-dashboard/" + id + "/appointments-check");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-12 pt-12 overflow-hidden">
        <img
          src={patient?.avatar ? patient.avatar : placeholder}
          alt="avatar"
          className="rounded-full object-cover w-[10rem]"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">
          {patient?.name ? patient.name : "unknown"}
        </h2>
        <p>{patient?.email ? patient.email : "unknown"}</p>
        <p>{patient?.gender ? patient.gender : "unknown"}</p>
        <p>{patient?.age ? patient.age : "unknown"}</p>
        {/* <ul>
          {patient?.issues?.map((issue, index) => (
            <li key={index}>{issue}</li>
          ))}
        </ul> */}
        <div className="card-actions">
          <button
            className="btn btn-primary mx-auto my-0"
            onClick={checkAppointment}
          >
            Appointments
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
