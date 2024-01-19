/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../General/Loading";
import ScheduleForm from "./ScheduleForm";
import MessageSVG from "../Svg/MessageSvg";

const DoctorEdit = ({ id }) => {
  const [doctor, setDoctor] = useState("");
  const [loading, setLoading] = useState(false);
  const [useFile, setUseFile] = useState(false);
  const navigate = useNavigate();

  const avatarRef = useRef();
  const patientsRef = useRef();
  const yearsRef = useRef();
  const doc_nameRef = useRef();
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

  let file;

  const handleFile = (e) => {
    file = e.target.file;
    setUseFile(true);
    return file;
  };

  // Update Schedule
  const updateSchedule = (newSchedule) => {
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      schedule: newSchedule,
    }));
  };

  const updateAccount = async (e) => {
    e.preventDefault();
    const newDoctorFormData = new FormData();

    if (avatarRef.current && avatarRef.current.files.length > 0) {
      newDoctorFormData.append("avatar", avatarRef.current.files[0]);
    }

    //Dynamical Header
    const headers = useFile
      ? {} //for form with files
      : {
          "Content-Type": "application/json", // for form without files
        };

    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/doctors/" + id,
        {
          method: "PUT",
          headers: headers,
          body: newDoctorFormData,
        }
      );
      if (response.ok) {
        console.log(newDoctorFormData);
        console.log(response);
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
          onClick={handleFile}
          ref={avatarRef}
        />
        <h3>Click on ? to edit</h3>
        <article>
          <div className="stats shadow max-w-[375px] min-h-[7rem]">
            {/* ------------------------------Stat patients */}
            <div className="stat w-[120px] relative h-[7rem]">
              <div className="stat-title">Patients</div>
              <div
                className="stat-value text-primary text-center "
                ref={patientsRef}
                contentEditable
              >
                {doctor?.patients ? doctor.patients : "?"}
              </div>
            </div>
            {/*  ------------------------------Stat years */}
            <div className="stat w-[120px] relative h-[7rem]">
              <div className="stat-title">Experience</div>
              <div
                className="stat-value text-secondary text-center "
                ref={yearsRef}
                contentEditable
              >
                {doctor?.years ? doctor.years : "?"}
              </div>
              <div className="stat-title text-center">Years</div>
            </div>
            {/* {/*  ------------------------------Stat  Rating */}
            <div className="stat w-[120px] relative h-[7rem]">
              <div className="stat-title">Rating</div>
              <div className="stat-value text-accent text-center ">
                {doctor?.rating ? doctor.rating : "✩"}
              </div>
            </div>
          </div>
        </article>
        {/* INFOs */}
        <article>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">About Doctor</h2>
              {/* {/* -------------------------------------Doctor Name */}
              <h3 ref={doc_nameRef} contentEditable>
                Name:
                {doctor?.doc_name ? doctor.doc_name : "?"}
              </h3>
              {/* {/* -------------------------------------Doctor Speciality */}
              <h4 ref={specialityRef} contentEditable>
                {" "}
                Speciality:
                {doctor?.speciality ? doctor.speciality : "?"}
              </h4>
              {/* {/* -------------------------------------Doctor Description */}
              <p ref={descriptionRef} contentEditable>
                {" "}
                About:
                {doctor?.description ? doctor.description : "?"}
              </p>
              {/* {/* -------------------------------------Doctor Address */}
              <div ref={addressRef} contentEditable>
                {" "}
                Address:
                {doctor?.address ? doctor.address : "?"}
              </div>
              <h2 className="card-title">Working time</h2>
              {/* {/* -------------------------------------Doctor Opening Hours */}
              <p>
                Schedule:
                {doctor?.opening_hours ? doctor.opening_hours : "Change below"}
              </p>
              <div>{/* <ScheduleForm onSubmit={updateSchedule} /> */}</div>

              {/* <h2 className="card-title">Comunication</h2>
              <div className="flex gap-4 items-center">
                <MessageSVG />
                <a href={`mailto:${doctor?.doc_email}`}>{doctor?.doc_email}</a>
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
