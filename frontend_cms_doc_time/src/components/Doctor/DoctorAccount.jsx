import { useState } from "react";
import { useParams } from "react-router-dom";
import DoctorDetail from "./DoctorDetail";
import DoctorEdit from "./DoctorEdit";

const DoctorAccount = () => {
  const [edit, setEdit] = useState(false);
  const { doctorId } = useParams();

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
          <DoctorEdit doctorId={doctorId} />
        ) : (
          <DoctorDetail doctorId={doctorId} />
        )}
      </section>
    </>
  );
};

export default DoctorAccount;
