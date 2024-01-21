import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <div className="card">
        <div className="card-body">
          <Link className="btn btn-primary" to="/login">
            Login
          </Link>
          <Link className="btn btn-primary" to="/sign-up">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;