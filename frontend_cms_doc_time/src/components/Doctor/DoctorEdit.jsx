/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../General/Loading";
import ScheduleForm from "./ScheduleForm";
// import { translateSchedule } from "../../utils/translateSchedule";

const DoctorEdit = ({ id }) => {
  const [doctor, setDoctor] = useState("");
  const [loading, setLoading] = useState(false);
  const [scheduleData, setScheduleData] = useState([]);

  const navigate = useNavigate();

  const avatarRef = useRef();
  const patientsRef = useRef();
  const yearsRef = useRef();
  const nameRef = useRef();
  const specialityRef = useRef();
  const descriptionRef = useRef();
  const addressRef = useRef();

  const placeholder =
    "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";

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
          // const scheduleData = JSON.parse(responseData.data.schedule);
          // const readableSchedule = JSON.stringify(scheduleData, null, 2);
          // console.log(readableSchedule);
          // console.log(scheduleData);
          //
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchOneDoctor();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  // ----------------------------------------------- EDIT DATA

  const updateAccount = async (e) => {
    e.preventDefault();
    const newDoctorFormData = new FormData();

    if (avatarRef.current && avatarRef.current.files.length > 0) {
      newDoctorFormData.append("avatar", avatarRef.current.files[0]);
    }

    newDoctorFormData.append("schedule", JSON.stringify(scheduleData));
    newDoctorFormData.append("patients", Number(patientsRef.current.value));
    newDoctorFormData.append("years", Number(yearsRef.current.value));
    newDoctorFormData.append("name", nameRef.current.value);
    newDoctorFormData.append("speciality", specialityRef.current.value);
    newDoctorFormData.append("description", descriptionRef.current.value);

    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/doctors/" + id,
        {
          method: "PUT",
          credentials: "include",
          body: newDoctorFormData,
        }
      );

      if (response.ok) {
        console.log("------------------------✅---", await response.json());
      } else {
        console.log(
          "Request failed with status:-----------------------------👺-",
          response.status
        );
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

  // Helper function to convert numeric day to day name
  const getDayName = (dayNumber) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysOfWeek[dayNumber];
  };

  return (
    <>
      <form
        onSubmit={updateAccount}
        className="flex flex-col justify-center items-center w-[100%] my-0 mx-0 gap-[2rem]"
        // -------------------------------------------------------------------------------------DONT FORGET encType="multipart/form-data"
        encType="multipart/form-data"
      >
        {/*--------------------------------------- AVATAR Preview */}
        <article className="avatar">
          <div className="w-24 rounded-full">
            <img src={doctor?.avatar ? doctor.avatar : placeholder} />
          </div>
        </article>
        <p>{id}</p>
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
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body justify-around gap-[1rem]">
              <h2 className="card-title text-gray-500 pb-4">About Doctor</h2>
              {/* {/* -------------------------------------Doctor Name */}
              <div className="flex justify-between items-center gap-x-2">
                <label htmlFor="name" className="font-bold text-primary">
                  Name:
                </label>
                <input
                  type="text"
                  ref={nameRef}
                  name="name"
                  id="name"
                  className="border-b border-secondary w-[50%]"
                  placeholder={doctor?.name ? doctor.name : ""}
                />
              </div>

              {/* {/* -------------------------------------Doctor Speciality */}
              <div className="flex justify-between items-center gap-x-2">
                <label htmlFor="speciality" className="font-bold text-primary">
                  Speciality:
                </label>
                <input
                  type="text"
                  ref={specialityRef}
                  name="speciality"
                  id="speciality"
                  className="border-b border-secondary w-[50%]"
                  placeholder={doctor?.speciality ? doctor.speciality : ""}
                ></input>
              </div>

              {/* {/* -------------------------------------Doctor Description */}

              <div className="flex justify-between items-center gap-x-2">
                <label htmlFor="description" className="font-bold text-primary">
                  About:
                </label>
                <input
                  type="text"
                  ref={descriptionRef}
                  id="description"
                  name="description"
                  className="border-b border-secondary w-[50%]"
                  placeholder={doctor?.description ? doctor.description : ""}
                ></input>
              </div>
              {/* {/* -------------------------------------Doctor Address */}

              <div className="flex justify-between items-center gap-x-2">
                <label htmlFor="address" className="font-bold text-primary">
                  Address:
                </label>
                <input
                  type="text"
                  ref={addressRef}
                  id="address"
                  name="address"
                  className="border-b border-secondary w-[50%]"
                  placeholder={doctor?.address ? doctor.address : ""}
                ></input>
              </div>
              {/* {/* -------------------------------------Experience Years */}
              <div className="flex justify-between items-center gap-x-2">
                <label
                  htmlFor="years"
                  className="font-bold text-primary whitespace-nowrap"
                >
                  Experience Years:
                </label>
                <input
                  type="number"
                  ref={yearsRef}
                  name="years"
                  id="years"
                  placeholder={doctor?.years ? doctor.years : ""}
                  className="border-b border-secondary w-[50%]"
                />
              </div>
              {/* {/* -------------------------------------Patients Number */}
              <div className="flex justify-between items-center gap-x-2">
                <label
                  htmlFor="patients"
                  className="font-bold text-primary whitespace-nowrap"
                >
                  Patients Number:
                </label>
                <input
                  type="number"
                  ref={patientsRef}
                  name="patients"
                  id="patients"
                  className="border-b border-secondary w-[50%]"
                  placeholder={doctor?.patients ? doctor.patients : " "}
                />
              </div>
              {/* {/* -------------------------------------Doctor Opening Hours */}
              <div className="pt-[2rem]">
                <h3 className="card-title justify-between text-gray-500 pb-4">
                  Working time
                </h3>

                <div className="pb-4">
                  Schedule Info:
                  <span className="px-4">
                    {doctor?.schedule === ""
                      ? doctor.schedule
                      : "Change below ↓"}
                  </span>
                </div>
                <div>
                  <ScheduleForm
                    // ref={scheduleRef}
                    scheduleData={scheduleData}
                    setScheduleData={setScheduleData}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-4 mt-4">
            <button className="btn btn-error" onClick={deleteAccount}>
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

export default DoctorEdit;
