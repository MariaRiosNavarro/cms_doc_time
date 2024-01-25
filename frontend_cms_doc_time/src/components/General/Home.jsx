import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="card">
        <figure>
          <img src="../../../public/covid-19.png" alt="" />
        </figure>
        <div className="card-body">
          <div className="card-actions justify-center items-stretch">
            <Link className="btn btn-primary" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary" to="/sign-up">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
