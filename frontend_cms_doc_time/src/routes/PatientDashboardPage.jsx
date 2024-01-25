import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PatientDetail from "../components/Patient/PatientDetail";
import PatientEdit from "../components/Patient/PatientEdit";
import { useLoginContext } from "../context/UserContext";
import { logout } from "../components/General/logoutFunction";

const PatientDashboardPage = () => {
  const { loginUser } = useLoginContext();
  const [edit, setEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const toggleEdit = () => {
    setEdit((prev) => !prev);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <div className="card-actions justify-around items-center ">
        <button onClick={toggleEdit} className="btn btn-primary">
          {edit ? "Close Edit" : "Open Edit"}
        </button>
        <div className="flex font-bold">
          <p>User: </p>
          <span className="text-primary pl-2">{loginUser}</span>
        </div>
        <button className="btn btn-accent" onClick={handleLogout}>
          logout
        </button>
      </div>
      {edit ? <PatientEdit id={id} /> : <PatientDetail id={id} />}
    </>
  );
};

export default PatientDashboardPage;
