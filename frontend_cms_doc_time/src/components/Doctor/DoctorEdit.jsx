/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../General/Loading";
import ScheduleForm from "./ScheduleForm";
// import MessageSVG from "../Svg/MessageSvg";

const DoctorEdit = ({ id }) => {
  const [doctor, setDoctor] = useState("");
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [useFile, setUseFile] = useState(false);
  const [scheduleData, setScheduleData] = useState([]);
  const navigate = useNavigate();

  const avatarRef = useRef();
  const patientsRef = useRef();
  const yearsRef = useRef();
  const nameRef = useRef();
  const specialityRef = useRef();
  const descriptionRef = useRef();
  const addressRef = useRef();

  // ----------------------------------------------- FETCH DATA
  useEffect(() => {
    setLoading(true);
    const fetchOneDoctor = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/api/doctors/" + id
        );
        const responseData = await response.json();
        if (!response.ok) {
          console.log("response no", responseData);
        } else {
          setLoading(false);
          setDoctor(responseData.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchOneDoctor();
  }, []);

  const placeholder =
    "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";

  if (loading) {
    return <Loading />;
  }

  // ----------------------------------------------- EDIT DATA

  //Handle Files

  const handleFile = (e) => {
    // eslint-disable-next-line no-unused-vars
    const selectedFile = e.target.files[0];
    setUseFile(true);
  };

  // // Update Schedule
  // const updateSchedule = (newSchedule) => {
  //   setDoctor((prevDoctor) => ({
  //     ...prevDoctor,
  //     schedule: newSchedule,
  //   }));
  // };

  const updateAccount = async (e) => {
    e.preventDefault();
    const newDoctorFormData = new FormData();

    if (avatarRef.current && avatarRef.current.files.length > 0) {
      newDoctorFormData.append("avatar", avatarRef.current.files[0]);
    }

    // I use the updateSchedule function to get the updated schedule.

    newDoctorFormData.append("schedule", JSON.stringify(scheduleData));

    newDoctorFormData.append("patients", Number(patientsRef.current.value));
    newDoctorFormData.append("years", Number(yearsRef.current.value));
    newDoctorFormData.append("name", nameRef.current.value);
    newDoctorFormData.append("speciality", specialityRef.current.value);
    newDoctorFormData.append("description", descriptionRef.current.value);

    console.log("form data:------------------");
    newDoctorFormData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/doctors/" + id,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newDoctorFormData),
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log(newDoctorFormData);
        console.log(response);
      } else {
        console.log("Request failed with status:", response.status);
        const errorBody = await response.text();
        console.log("Error Body:", errorBody);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteAccount = () => {
    navigate("/");
  };

  return (
    <>
      <section className="flex flex-col justify-center items-center w-[100%] my-0 mx-0 gap-[2rem]">
        {/*--------------------------------------- AVATAR Preview */}
        <article className="avatar">
          <div className="w-24 rounded-full">
            <img src={doctor?.avatar ? doctor.avatar : placeholder} />
          </div>
        </article>
        <h2>Change Image</h2>
        <input
          type="file"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          onChange={handleFile}
          name="avatar"
          ref={avatarRef}
        />
        <h3>click on the line to edit</h3>
        <article>
          <div className="stats shadow flex flex-col">
            {/* ------------------------------Stat patients */}
            <div className="stat  relative h-[8rem]">
              <h3 className="stat-title">Patients</h3>
              <input
                className="stat-value text-primary text-center border-b  border-secondary max-w-[385px] w-[70%]"
                ref={patientsRef}
                name="patients"
                id="patients"
                placeholder={doctor?.patients ? doctor.patients : " "}
              ></input>
            </div>
            {/*  ------------------------------Stat years */}
            <div className="stat  relative h-[8rem]">
              <h3 className="stat-title leading-4">Experience Years</h3>
              <input
                className="stat-value text-secondary text-center border-b  border-secondary max-w-[385px] w-[70%]"
                ref={yearsRef}
                name="years"
                id="years"
                placeholder={doctor?.years ? doctor.years : ""}
              ></input>
            </div>
          </div>
        </article>
        {/* INFOs */}
        <article>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-gray-500 pb-4">About Doctor</h2>
              {/* {/* -------------------------------------Doctor Name */}
              <div className="flex gap-x-2">
                <label htmlFor="name" className="font-bold text-primary">
                  Name:
                </label>
                <input
                  ref={nameRef}
                  name="name"
                  id="name"
                  className="border-b border-secondary w-[3rem]"
                  placeholder={doctor?.name ? doctor.name : ""}
                />
              </div>

              {/* {/* -------------------------------------Doctor Speciality */}
              <div className="flex gap-x-2">
                <label htmlFor="speciality" className="font-bold text-primary">
                  Speciality:
                </label>
                <input
                  ref={specialityRef}
                  name="speciality"
                  id="speciality"
                  className="border-b border-secondary w-[3rem]"
                  placeholder={doctor?.speciality ? doctor.speciality : ""}
                ></input>
              </div>

              {/* {/* -------------------------------------Doctor Description */}

              <div className="flex gap-x-2">
                <label htmlFor="description" className="font-bold text-primary">
                  About:
                </label>
                <input
                  ref={descriptionRef}
                  id="description"
                  name="description"
                  className="border-b border-secondary w-[3rem]"
                  placeholder={doctor?.description ? doctor.description : ""}
                ></input>
              </div>
              {/* {/* -------------------------------------Doctor Address */}

              <div className="flex gap-x-2 pb-4">
                <label htmlFor="address" className="font-bold text-primary">
                  Address:
                </label>
                <input
                  ref={addressRef}
                  id="address"
                  name="address"
                  className="border-b border-secondary w-[3rem]"
                  placeholder={doctor?.address ? doctor.address : ""}
                ></input>
              </div>

              <h3 className="card-title text-gray-500 pb-4">Working time</h3>
              {/* {/* -------------------------------------Doctor Opening Hours */}
              <div className="pb-4">
                Schedule Info:
                <span className="px-4">
                  {doctor?.schedule ? doctor.schedule : "Change below ↓"}
                </span>
              </div>
              <div>
                {" "}
                <ScheduleForm
                  // ref={scheduleRef}
                  scheduleData={scheduleData}
                  setScheduleData={setScheduleData}
                />
              </div>

              {/* <h2 className="card-title">Comunication</h2>
              <div className="flex gap-4 items-center">
                <MessageSVG />
                <a href={`mailto:${doctor?.email}`}>{doctor?.email}</a>
              </div> */}
            </div>
          </div>
          <div className="flex justify-center items-center gap-4 mt-4">
            <button className="btn btn-error" onClick={deleteAccount}>
              {"Remove Account"}
            </button>
            <button className="btn btn-primary" onClick={updateAccount}>
              {"Update data"}
            </button>
          </div>
        </article>
      </section>
    </>
  );
};

export default DoctorEdit;
