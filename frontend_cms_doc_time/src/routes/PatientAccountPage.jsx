import { useState } from "react";
import { useParams } from "react-router-dom";
import PatientDetail from "../components/Patient/PatientDetail";
import PatientEdit from "../components/Patient/PatientEdit";

const PatientAccountPage = () => {
  const [edit, setEdit] = useState(false);
  const { id } = useParams();

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
        {edit ? <PatientEdit id={id} /> : <PatientDetail id={id} />}
      </section>
    </>
  );
};

export default PatientAccountPage;
