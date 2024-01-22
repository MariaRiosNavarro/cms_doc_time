import { Link } from "react-router-dom";

import { Outlet } from "react-router-dom";

const AdminDashboardPage = () => {
  return (
    <>
      <main>
        <h1>Your Dashboard</h1>
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
