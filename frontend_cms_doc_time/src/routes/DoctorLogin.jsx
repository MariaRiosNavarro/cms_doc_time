import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const DoctorLogin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const login = async () => {
    const doctor = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/auth/login",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(doctor),
        credentials: "include", //necessary for the cookies and to send the token
      }
    );
    if (response.ok) {
      console.log("Doctor is allowed");
      const json = await response.json();
      const id = json.data;
      navigate("/doctor/" + id);
    }
  };
  // We can save the token in local storage or in cookies (in Browser) (vulnerable and legible)
  // or we can save the token in one useContext (in variables) but after one reload, we lost the token,
  // Important is to define the cookie as httpOnly and secure in backend

  return (
    <main className="h-screen flex justify-center items-center">
      <div className="">
        <div
          className="bg-info text-black p-4 flex flex-col gap-2 rounded-xl w-[20rem]"
          //   onSubmit={login}
        >
          <h3 className="text-center font-bold">Doctor Login</h3>
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            className="bg-white px-2 py-1 rounded"
            type="email"
            id="email"
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            className="bg-white px-2 py-1 rounded"
            type="password"
            id="password"
            name="password"
          />
          {/* TODO -for the future */}
          {/* <div className="form-control">
            <label className="label cursor-pointer justify-start gap-4">
              <input
                type="checkbox"
                className="checkbox bg-base-100 checkbox-secondary"
              />
              <span className="label-text">Remember me</span>
            </label>
          </div> */}

          <input
            className="btn btn-primary my-4"
            type="submit"
            value="login"
            onClick={login}
          />
          {/* TODO -for the future */}
          {/* <div className="w-[100%]">
            <a className="w-[100%] block text-end py-4 text-gray-500 mb-4">
              Forgot Password?
            </a>
            <hr className="border-gray-400 w-[100%] py-4" />
            <span className="p-2 border border-gray-400 relative top-[-3rem] left-[43%] bg-info">
              or
            </span>
            <div>
              <a href="">Google</a>
              <a href="">Facebook</a>
            </div>
          </div> */}
          <div>
            <Link
              to="/register"
              className="w-[100%] block text-end py-4 text-gray-500 mb-4"
            >
              Need an account? <span className="underline">SIGN UP</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DoctorLogin;
