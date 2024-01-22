import { useEffect, useState } from "react";
import MessageSVG from "../Svg/MessageSvg";
import Loading from "../General/Loading";

// eslint-disable-next-line react/prop-types
const DoctorDetail = ({ id, btnFunction, btnMessage }) => {
  const [doctor, setDoctor] = useState("");
  const [loading, setLoading] = useState(false);
  const [dbScheduleData, setDbScheduleData] = useState([]);

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
          setDbScheduleData(JSON.parse(responseData.data.schedule));
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchOneDoctor();
    console.log(dbScheduleData);
  }, []);

  const placeholder =
    "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";

  if (loading) {
    return <Loading />;
  }

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
    <section className="flex flex-col justify-center items-center w-[100%] my-0 mx-0 gap-[2rem]">
      {/* AVATAR + Badges */}
      <article className="avatar">
        <div className="w-24 rounded-full">
          <img src={doctor.avatar ? doctor.avatar : placeholder} />
        </div>
      </article>
      <p>{id}</p>
      <article>
        <div className="stats shadow max-w-[375px] min-h-[7rem]">
          {/* Stat patients */}
          <div className="stat w-[120px] relative h-[7rem]">
            <div className="stat-title">Patients</div>
            <div className="stat-value text-primary text-center ">
              {doctor?.patients ? doctor.patients : "?"}
            </div>
            {/* <div className="stat-desc">21% more than last month</div> */}
          </div>
          {/* Stat years */}
          <div className="stat w-[120px] relative h-[7rem]">
            <div className="stat-title">Experience</div>
            <div className="stat-value text-secondary text-center ">
              {doctor?.years ? doctor.years : "?"}
            </div>
            <div className="stat-title text-center">Years</div>
            {/* <div className="stat-desc">21% more than last month</div> */}
          </div>
          {/* Stat Rating */}
          <div className="stat w-[120px] relative h-[7rem]">
            <div className="stat-title">Rating</div>
            <div className="stat-value text-accent text-center ">
              {doctor?.rating ? doctor.rating : "?"}
            </div>
          </div>
        </div>
      </article>
      {/* INFOs */}
      <article>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">About Doctor</h2>
            <h3 className="flex justify-between">
              Name:{" "}
              <span className="pl-2 text-secondary font-bold">
                {doctor?.name ? doctor.name : "Unknown"}
              </span>
            </h3>
            <h4 className="flex justify-between">
              Speciality:
              <span className="pl-2 text-secondary font-bold">
                {doctor?.speciality ? doctor.speciality : "Unknown"}
              </span>
            </h4>
            <div className="flex justify-between ">
              Address:
              <span className="pl-2 text-secondary font-bold">
                {doctor?.address ? doctor.address : "Unknown"}
              </span>
            </div>
            <div className="flex flex-col pb-8">
              About:
              <p className="pl-2 text-secondary text-center font-bold">
                {doctor?.description ? doctor.description : "Unknown "}
              </p>
            </div>
            {/* --------------------------------------------------------------------Schedule /Maybe refactor */}
            <h2 className="card-title">Working time</h2>
            <div className="py-8">
              {dbScheduleData.map((daySchedule) => (
                <div key={daySchedule.day}>
                  <h3 className="text-center font-bold">
                    {getDayName(daySchedule.day)}
                  </h3>
                  {daySchedule.periods.map((period, index) => (
                    <p className="text-center" key={index}>
                      {Object.entries(period).map(
                        ([timeOfDay, { start, end }]) => (
                          <span key={timeOfDay}>
                            {timeOfDay.charAt(0).toUpperCase() +
                              timeOfDay.slice(1)}
                            : {start} - {end}
                            <br />
                          </span>
                        )
                      )}
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <h2 className="card-title">Comunication</h2>
            <div className="flex gap-4 items-center pb-4">
              <MessageSVG />
              <a href={`mailto:${doctor?.email}`}>{doctor?.email}</a>
            </div>
            <button
              className="btn btn-primary mx-auto my-0"
              onClick={btnFunction}
            >
              {btnMessage}
            </button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default DoctorDetail;
