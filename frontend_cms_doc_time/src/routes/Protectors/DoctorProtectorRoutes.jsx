import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/General/Loading";
import { UserLoginProvider } from "../../context/UserContext";

const DoctorProtectorRoutes = () => {
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

        if (response.ok && (role === "admin" || role === "doctor")) {
          setAuthorized(true);
          console.log("doctor autorized in PROTECTOR /api/auth/check");
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

export default DoctorProtectorRoutes;
