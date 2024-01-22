/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const DoctorCard = (props) => {
  return (
    <div key={props._id} className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-12 pt-12">
        <img src={props.avatar} alt="avatar" className="rounded-full" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{props?.name ? props.name : ""}</h2>
        <p>{props?.email ? props.email : ""}</p>
        <p>
          <span className="first-letter:uppercase">{props.role}</span>
          {props?.speciality ? props.speciality : ""}
        </p>
        <p>{props?.description ? props.description : ""}</p>
        <div className="card-actions">
          <Link to={props.link + props._id}>
            <button className="btn btn-primary">More about</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
