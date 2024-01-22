import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DoctorDetail from "../components/Doctor/DoctorDetail";
import DoctorEdit from "../components/Doctor/DoctorEdit";

const DoctorDashboardPage = () => {
  const [edit, setEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const toggleEdit = () => {
    setEdit((prev) => !prev);
  };

  const checkAppointment = () => {
    navigate("/doctor-dashboard/" + id + "/appointments-check");
  };

  return (
    <>
      <div className="card-actions justify-center p-4">
        <button onClick={toggleEdit} className="btn btn-secondary">
          {edit ? "Close Edit" : "Open Edit"}
        </button>
      </div>
      {edit ? (
        <DoctorEdit id={id} />
      ) : (
        <DoctorDetail
          id={id}
          btnFunction={checkAppointment}
          btnMessage="Check Appointment"
        />
      )}
    </>
  );
};

export default DoctorDashboardPage;
