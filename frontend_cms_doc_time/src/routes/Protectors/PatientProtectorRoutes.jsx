import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/General/Loading";
import { UserLoginProvider } from "../../context/UserContext";

const PatientProtectorRoutes = () => {
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

        if (response.ok && (role === "admin" || role === "patient")) {
          setAuthorized(true);
        }
        if (response.ok) {
          setAuthorized(true);
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
    <UserLoginProvider>
      <Outlet />
    </UserLoginProvider>
  );
};

export default PatientProtectorRoutes;
