import { useState } from "react";

const UserForm = () => {
  const [message, setMessage] = useState("");

  const addUser = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    console.log(form);

    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/users",
      {
        method: "POST",
        credentials: "include",
        body: form,
      }
    );
    if (response.ok) {
      console.log(form);
      setMessage("User successfully created");
      setTimeout(() => {
        setMessage("");
      }, 3000);

      e.target.reset();
    }
  };

  return (
    <>
      <form
        onSubmit={addUser}
        className="flex flex-col justify-center items-center w-[100%] my-[1rem] mx-0 gap-[2rem]"
      >
        <div className="h-[1.5rem]">
          {message && <p className="p-4 rounded-xl bg-green-300">{message}</p>}
        </div>
        <article>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body justify-around gap-[1rem]">
              <h2 className="card-title text-gray-500 pb-4">Add User</h2>
              {/* {/* -------------------------------------email */}
              <div className="flex justify-between items-center gap-x-2">
                <label htmlFor="email" className="font-bold text-primary">
                  Email:
                </label>
                <input
                  name="email"
                  className="border-b border-secondary w-[50%]"
                ></input>
              </div>

              {/* {/* -------------------------------------password */}

              <div className="flex justify-between items-center gap-x-2">
                <label htmlFor="password" className="font-bold text-primary">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  className="border-b border-secondary w-[50%]"
                ></input>
              </div>
              {/* {/* -------------------------------------role */}
              <label htmlFor="name">Role:</label>
              <select
                name="role"
                id="role"
                className="select select-info w-full max-w-xs"
              >
                <option value={"patient"}>Patient</option>
                <option value={"doctor"}>Doctor</option>
                <option value={"admin"}>Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Add User
            </button>
          </div>
        </article>
      </form>
    </>
  );
};

export default UserForm;
