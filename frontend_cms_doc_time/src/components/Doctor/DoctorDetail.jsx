import { useEffect, useState } from "react";
import MessageSVG from "../Svg/MessageSvg";
import Loading from "../General/Loading";

// eslint-disable-next-line react/prop-types
const DoctorDetail = ({ id, btnFunction, btnMessage }) => {
  const [doctor, setDoctor] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <section className="flex flex-col justify-center items-center w-[100%] my-0 mx-0 gap-[2rem]">
      {/* AVATAR + Badges */}
      <article className="avatar">
        <div className="w-24 rounded-full">
          <img src={doctor.avatar ? doctor.avatar : placeholder} />
        </div>
      </article>
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
            <h3>Name:{doctor?.name ? doctor.name : "Unknown"}</h3>
            <h4>
              Speciality:{doctor?.speciality ? doctor.speciality : "Unknown"}
            </h4>
            <p>About:{doctor?.description ? doctor.description : "Unknown"}</p>
            <div>Address:{doctor?.address ? doctor.address : "Unknown"}</div>
            <h2 className="card-title">Working time</h2>
            <p>
              Schedule:
              {doctor?.opening_hours ? doctor.opening_hours : "Unknown"}
            </p>
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
