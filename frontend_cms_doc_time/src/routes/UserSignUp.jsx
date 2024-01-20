import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const UserSignUp = () => {
  const [message, setMessage] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const roleRef = useRef();

  const signUp = async () => {
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      setMessage("The Password is not the same");
      setTimeout(() => {
        setMessage("");
        passwordConfirmationRef.current.value = "";
      }, 3000);
      return;
    }
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      role: roleRef.current.value,
    };

    console.log(user);
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/auth/register",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user),
      }
    );
    if (response.ok) {
      console.log("User is register");
    }
  };
  // We can save the token in local storage or in cookies (in Browser) (vulnerable and legible)
  // or we can save the token in one useContext (in variables) but after one reload, we lost the token,
  // Important is to define the cookie as httpOnly and secure in backend

  return (
    <main className="h-screen flex justify-center items-center">
      <div className="">
        <div
          className="bg-info text-black p-4 flex flex-col gap-2 rounded-xl  w-[20rem]"
          //   onSubmit={login}
        >
          <h3 className="text-center font-bold">User Sign up</h3>
          <label htmlFor="role">Choose your role</label>
          <select
            ref={roleRef}
            name="role"
            className="select select-bordered select-primary select-s w-full max-w-s"
          >
            <option value={"patient"} role="patient">
              Patient
            </option>
            <option value={"doctor"} role="doctor">
              Doctor
            </option>
            <option value={"admin"} role="admin" disabled>
              Admin
            </option>
          </select>
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
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            ref={passwordConfirmationRef}
            className="bg-white px-2 py-1 rounded"
            type="password"
            id="confirm-password"
            name="confirm-password"
          />
          {message && <p className="rounded bg-warning p-2">{message}</p>}
          <input
            className="btn btn-primary my-4"
            type="submit"
            value="sign up"
            onClick={signUp}
          />
          <div>
            <Link
              to="/login"
              className="w-[100%] block text-end py-4 text-gray-500 mb-4"
            >
              Have you already an Account?
              <span className="underline">LOGIN</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserSignUp;
