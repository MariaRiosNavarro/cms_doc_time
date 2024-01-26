// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../context/UserContext";
import { logout } from "../components/General/logoutFunction";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import { useState } from "react";
import DoctorList from "./DoctorList";
import PatientAppointments from "../components/Patient/PatientAppointments";
import PatientAccount from "../components/Patient/PatientAccount";

const PatientDashboardPage = () => {
  const { loginUser } = useLoginContext();
  const [account, setAccount] = useState(true);
  const [doctorsList, setDoctorsList] = useState(false);
  const [appointments, setAppointments] = useState(false);
  // const [oneDoctorDetail, setOneDoctorDetail] = useState(false);

  const toggleAccount = () => {
    setAppointments(false);
    setDoctorsList(false);
    setAccount((prev) => !prev);
  };
  const toggleDoctors = () => {
    setAccount(false);
    setAppointments(false);
    setDoctorsList((prev) => !prev);
  };
  const toggleAppointments = () => {
    setAccount(false);
    setDoctorsList(false);
    setAppointments((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <div className="card-actions justify-around items-center px-4 bg-primary">
        <div className="navbar bg-primary ">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <MenuSharpIcon className="stroke-base-100 text-base-100 stroke-[0.1px] h-[2rem]" />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-[auto] "
              >
                <li
                  className="py-2 active:text-primary active:font-bold"
                  onClick={toggleAccount}
                >
                  Account
                </li>
                <li
                  className="py-2 active:text-primary active:font-bold"
                  onClick={toggleDoctors}
                >
                  Doctors
                </li>
                <li
                  className="py-2 active:text-primary active:font-bold"
                  onClick={toggleAppointments}
                >
                  Appointments
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-center">
            <a className=" text-base-100 font-bold text-xl">
              Hello, {loginUser}
            </a>
          </div>
          <div className="navbar-end" onClick={handleLogout}>
            <LogoutSharpIcon className="stroke-base-100 text-base-100 stroke-[0.1px] h-[2rem]" />
          </div>
        </div>
      </div>
      {account && <PatientAccount />}
      {appointments && <PatientAppointments />}
      {doctorsList && <DoctorList />}
    </>
  );
};

export default PatientDashboardPage;
