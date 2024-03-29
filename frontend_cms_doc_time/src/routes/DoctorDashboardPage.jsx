// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../context/UserContext";
import { logout } from "../components/General/logoutFunction";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import { useParams } from "react-router-dom";
import { useState } from "react";
import DoctorAppointments from "../components/Doctor/DoctorAppointments";
import DoctorAccount from "../components/Doctor/DoctorAccount";

const DoctorDashboardPage = () => {
  const { loginUser } = useLoginContext();
  const { doctorId } = useParams();
  const [account, setAccount] = useState(true);
  const [appointments, setAppointments] = useState(false);

  const toggleAccount = () => {
    setAppointments(false);
    setAccount((prev) => !prev);
  };

  const toggleAppointments = () => {
    setAccount(false);
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
      {account && <DoctorAccount doctorId={doctorId} />}
      {appointments && <DoctorAppointments doctorId={doctorId} />}
    </>
  );
};

export default DoctorDashboardPage;
