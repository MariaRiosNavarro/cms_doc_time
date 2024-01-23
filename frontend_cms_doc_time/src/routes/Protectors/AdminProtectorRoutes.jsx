import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/General/Loading";
import { UserLoginProvider } from "../../context/UserContext";

const AdminProtectorRoutes = () => {
  // What should this component do?

  // 1: Check if the USER jwt is valid
  // 2: If it is valid: render the child
  // 2.b- If it is not valid: navigate to login or home
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkBackendJWTToken = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/api/auth/check",
          {
            credentials: "include",
          }
        );

        const json = await response.json();
        const role = json.role;

        if (response.ok && role === "admin") {
          setAuthorized(true);
          console.log(role);
        }
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    checkBackendJWTToken();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!authorized && !loading) {
    return navigate("/");
  }
  return (
    <>
      <UserLoginProvider>
        <Outlet />
      </UserLoginProvider>
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
