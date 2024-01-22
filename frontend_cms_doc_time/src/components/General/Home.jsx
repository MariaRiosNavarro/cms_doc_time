import { Link } from "react-router-dom";
import DoctorList from "../../routes/DoctorList";

const Home = () => {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <Link className="btn btn-primary" to="/login">
            Login
          </Link>
          <Link className="btn btn-primary" to="/sign-up">
            Sign Up
          </Link>
        </div>
        <DoctorList />
      </div>
    </>
  );
};

export default Home;
