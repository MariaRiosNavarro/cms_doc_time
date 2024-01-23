/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Loading from "../General/Loading";

const PatientDetail = ({ btnFunction, btnMessage, id }) => {
  const [patient, setPatient] = useState("");
  const [loading, setLoading] = useState(false);
  const placeholder =
    "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";

  useEffect(() => {
    setLoading(true);
    const fetchOnePatient = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/api/patients/" + id
        );
        const responseData = await response.json();
        if (!response.ok) {
          console.log("response no", responseData);
        } else {
          setLoading(false);
          setPatient(responseData.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchOnePatient();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div key={patient._id} className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-12 pt-12 overflow-hidden">
        <img
          src={patient.avatar ? patient.avatar : placeholder}
          alt="avatar"
          className="rounded-full object-cover w-[10rem]"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{patient?.name ? patient.name : ""}</h2>
        <p>{patient?.email ? patient.email : ""}</p>
        <p>{patient?.gender ? patient.gender : ""}</p>
        <p>{patient?.age ? patient.age : ""}</p>
        <ul>
          {patient?.issues?.map((issue, index) => (
            <li key={index}>{issue}</li>
          ))}
        </ul>
        <div className="card-actions">
          <button
            className="btn btn-primary mx-auto my-0"
            onClick={btnFunction}
          >
            {btnMessage}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
