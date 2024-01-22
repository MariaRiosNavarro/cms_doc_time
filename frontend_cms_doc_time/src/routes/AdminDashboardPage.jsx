import { Link } from "react-router-dom";
import { useLoginContext } from "../context/UserContext";
import { Outlet } from "react-router-dom";

const AdminDashboardPage = () => {
  const { loginUser } = useLoginContext();
  return (
    <>
      <main className="card">
        <div className="bg-primary ">
          <h2 className="card-title text-base-100 text-center justify-center p-4">
            login: <span className="text-accent">{loginUser}</span>
          </h2>
          <h3 className="text-base-100 text-center text-3xl p-4">
            Admin Dashboard
          </h3>
          <nav className="flex justify-around items-center text-base-100 p-4">
            <Link to={"/admin-dashboard/users"}>Users</Link>
            <Link to={"/admin-dashboard/add"}>Add Users</Link>
            <Link to={"/"}>Appointments</Link>
          </nav>
        </div>
        <Outlet />
      </main>
    </>
  );
};

export default AdminDashboardPage;
