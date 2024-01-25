/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
// import Loading from "../General/Loading";

const PatientDetail = ({ patientId }) => {
  const [patient, setPatient] = useState("");
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    // setLoading(true);
    const fetchOnePatient = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/api/patients/" + patientId,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const responseData = await response.json();
        console.log(responseData);

        if (!response.ok) {
          console.log("response no", responseData);
        } else {
          // setLoading(false);
          setPatient(responseData.data);
          console.log(responseData);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchOnePatient();
    console.log(patient);
  }, []);

  const placeholder = "https://picsum.photos/300/300";

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <div className="card w-96 bg-base-100  mx-auto my-8 ">
      <figure className="px-12 pt-12 overflow-hidden">
        <img
          src={patient?.avatar ? patient.avatar : placeholder}
          alt="avatar"
          className="rounded-full object-cover w-[10rem]"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">
          Name:
          {patient?.name ? patient.name : "unknown"}
        </h2>
        <p>Email: {patient?.email ? patient.email : "unknown"}</p>
        <p>Gender: {patient?.gender ? patient.gender : "unknown"}</p>
        <p>Age: {patient?.age ? patient.age : "unknown"}</p>
        {/* <ul>
          {patient?.issues?.map((issue, index) => (
            <li key={index}>{issue}</li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default PatientDetail;
