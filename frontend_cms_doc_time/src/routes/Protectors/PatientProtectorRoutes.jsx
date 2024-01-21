import { Outlet } from "react-router-dom";

const PatientProtectorRoutes = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default PatientProtectorRoutes;
