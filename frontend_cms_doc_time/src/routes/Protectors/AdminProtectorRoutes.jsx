import { Outlet } from "react-router-dom";

const AdminProtectorRoutes = () => {
  // What should this component do?

  // 1: Check if the USER jwt is valid
  // 2: If it is valid: render the child
  // 2.b- If it is not valid: navigate to login or home
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AdminProtectorRoutes;

// Outlet, similar to {children}.
// But it also helps to protect the
// lower rods when we nest them.
// If someone navigates there,
// the logic and protection of
// Protector will be performed first,
// before anyone gets into the child element,
// which will be performed in the Outlet
