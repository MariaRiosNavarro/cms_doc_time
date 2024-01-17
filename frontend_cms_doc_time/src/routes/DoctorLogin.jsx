import { useRef } from "react";

const DoctorLogin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

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
        credentials: "include", //necessary for the cookies
      }
    );
    if (response.ok) {
      console.log("Doctor is allowed");
    }
  };

  return (
    <main className="h-screen flex justify-center items-center">
      <div className="w-64 bg-primary text-black rounded">
        <div
          className="bg-primary p-4 flex flex-col gap-2 rounded"
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
          <input className="btn my-4" type="submit" onClick={login} />
        </div>
      </div>
    </main>
  );
};

export default DoctorLogin;
