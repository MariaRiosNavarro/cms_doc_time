import { useState } from "react";
import { useParams } from "react-router-dom";
import PatientDetail from "./PatientDetail";
import PatientEdit from "./PatientEdit";

const PatientAccount = () => {
  const [edit, setEdit] = useState(false);
  const { patientId } = useParams();

  const toggleEdit = () => {
    setEdit((prev) => !prev);
  };

  return (
    <>
      <section className="relative">
        <div className="card-actions justify-around items-center relative left-[35%] top-[2rem] ">
          <button onClick={toggleEdit} className="underline">
            {edit ? "Close Edit" : "Open Edit"}
          </button>
        </div>
        {edit ? (
          <PatientEdit patientId={patientId} />
        ) : (
          <PatientDetail patientId={patientId} />
        )}
      </section>
    </>
  );
};

export default PatientAccount;
