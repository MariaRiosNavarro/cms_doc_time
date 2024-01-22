import { Link } from "react-router-dom";
import { useLoginContext } from "../context/UserContext";
import { Outlet } from "react-router-dom";

const AdminDashboardPage = () => {
  const { loginUser } = useLoginContext();
  console.log(loginUser);

  return (
    <>
      <main className="card">
        <h2 className="card-title text-center justify-center">
          Hello, {loginUser}
        </h2>
        <h3>Your Dashboard</h3>
        <nav>
          <Link to={"/admin-dashboard/users"}>Users</Link>
          {/* <Link to={"/appointments"}>Appointments</Link> */}
        </nav>

        <Outlet />
      </main>
    </>
  );
};

export default AdminDashboardPage;
