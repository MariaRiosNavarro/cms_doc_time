/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const PatientEdit = ({ patientId }) => {
  const [patient, setPatient] = useState("");

  const navigate = useNavigate();

  const avatarRef = useRef();
  const nameRef = useRef();
  const genderRef = useRef();
  const ageRef = useRef();
  // const issuesRef = useRef();

  // ----------------------------------------------- FETCH DATA
  useEffect(() => {
    const fetchOnePatient = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/api/patients/" + patientId,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const responseData = await response.json();
        if (!response.ok) {
          console.log("response no", responseData);
        } else {
          setPatient(responseData.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchOnePatient();
  }, [patientId]);

  // ----------------------------------------------- EDIT DATA

  const updateAccount = async (e) => {
    e.preventDefault();
    const patientForm = new FormData();

    if (avatarRef.current && avatarRef.current.files.length > 0) {
      patientForm.append("avatar", avatarRef.current.files[0]);
      console.log("file");
    }

    const nameValue = nameRef.current.value;
    if (nameValue !== "") {
      patientForm.append("name", nameValue);
    }

    const ageValue = ageRef.current.value;
    if (ageValue !== "" && ageValue !== null) {
      patientForm.append("age", Number(ageValue));
    }

    const genderValue = genderRef.current.value;
    if (genderValue !== "" && genderValue !== null) {
      patientForm.append("gender", genderValue);
    }

    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/patients/" + patientId,
        {
          method: "PUT",
          credentials: "include",
          body: patientForm,
        }
      );
      const json = await response.json();
      if (response.ok) {
        console.log("✅", json.data);
      } else {
        console.log("Request failed with status:👺-", response.status);
        console.log("Error Body:", json.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteAccount = () => {
    navigate("/");
  };

  const placeholder = "https://picsum.photos/200/200";

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <>
      <form
        onSubmit={updateAccount}
        className="flex flex-col justify-center items-center w-[100%] my-0 mx-0 gap-[2rem] mt-8  "
        // -------------------------------------------------------------------------------------DONT FORGET encType="multipart/form-data" & remove "content-type":"application/json" from header
        encType="multipart/form-data"
      >
        {/*--------------------------------------- AVATAR Preview */}
        <article className="avatar">
          <div className="w-24 rounded-full">
            <img src={patient?.avatar ? patient.avatar : placeholder} />
          </div>
        </article>
        <h2>Change Image</h2>
        <input
          type="file"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          // onChange={handleFile}
          name="avatar"
          ref={avatarRef}
        />
        <h3>click on the line to edit</h3>
        {/* INFOs */}
        <article>
          <div className="card w-96 bg-base-100">
            <div className="card-body justify-around gap-[1rem]">
              <h2 className="card-title text-gray-500 pb-4">About Patient</h2>
              {/* {/* -------------------------------------Patient Name */}
              <div className="flex justify-between items-center gap-x-2">
                <label htmlFor="name" className="font-bold text-primary">
                  Name:
                </label>
                <input
                  type="text"
                  ref={nameRef}
                  name="name"
                  id="name"
                  className="border-b border-accent w-[50%]"
                  placeholder={patient?.name ? patient.name : ""}
                />
              </div>

              {/* {/* -------------------------------------Patient Age */}
              <div className="flex justify-between items-center gap-x-2">
                <label htmlFor="age" className="font-bold text-primary">
                  Age:
                </label>
                <input
                  type="number"
                  ref={ageRef}
                  name="age"
                  id="age"
                  className="border-b border-accent w-[50%]"
                  placeholder={patient?.age ? patient.age : ""}
                ></input>
              </div>

              {/* {/* -------------------------------------Patient Description */}

              <div className="flex flex-col justify-center items-center gap-x-8 pb-8 pt-4">
                <label htmlFor="gender" className="font-bold text-primary pb-8">
                  Gender:
                </label>
                <select
                  ref={genderRef}
                  name="gender"
                  className="select select-bordered select-primary select-s w-full max-w-s bg-slate-100 "
                >
                  <option value={"trans"}>Trans</option>
                  <option value={"non-binary"}>Non-binary</option>
                  <option value={"man"}>Man</option>
                  <option value={"woman"}>Woman</option>
                  <option value={"none"}>None of the options/ No Answer</option>
                </select>
              </div>
              {/* {/* -------------------------------------Issues */}

              {/* <div className="flex justify-between items-center gap-x-2">
                <label htmlFor="address" className="font-bold text-primary">
                  Issues:
                </label>
                <input
                  type="text"
                  ref={issuesRef}
                  id="address"
                  name="address"
                  className="border-b border-secondary w-[50%]"
                  placeholder={patient?.address ? patient.address : ""}
                ></input>
              </div> */}
            </div>
          </div>
          <div className="flex justify-center items-center gap-4 ">
            <button
              className="btn btn-error text-base-200"
              onClick={deleteAccount}
            >
              {"Remove Account"}
            </button>
            <button type="submit" className="btn btn-primary">
              {"Update data"}
            </button>
          </div>
        </article>
      </form>
    </>
  );
};

export default PatientEdit;
