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
      <div className="card-actions justify-around items-center ">
        <button onClick={toggleEdit} className="btn btn-primary">
          {edit ? "Close Edit" : "Open Edit"}
        </button>
      </div>
      {edit ? <PatientEdit id={id} /> : <PatientDetail id={id} />}
    </>
  );
};

export default PatientAccountPage;
