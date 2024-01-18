import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessageSVG from "../components/Svg/MessageSvg";

const DoctorDashboardPage = () => {
  const { id } = useParams();
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
    return (
      <div className="h-screen flex items-center justify-center gap-8">
        <span className="loading loading-spinner text-primary w-[10%]"></span>
        <span className="loading loading-spinner text-secondary w-[10%]"></span>
        <span className="loading loading-spinner text-accent w-[10%]"></span>
      </div>
    );
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
            <p>{doctor?.description ? doctor.description : "Unknown"}</p>
            <h2 className="card-title">Working time</h2>
            <p>{doctor?.opening_hours ? doctor.opening_hours : "Unknown"}</p>
            <h2 className="card-title">Comunication</h2>
            <div className="flex gap-4 items-center">
              <MessageSVG />
              <a href={`mailto:${doctor?.doc_email}`}>{doctor?.doc_email}</a>
            </div>

            <div className="card-actions justify-end">
              <button className="btn btn-primary">Edit</button>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default DoctorDashboardPage;
