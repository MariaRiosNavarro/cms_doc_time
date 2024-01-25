/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const DoctorCard = (props) => {
  const placeholder = "https://picsum.photos/200/200";

  return (
    <div key={props._id} className="card  bg-base-100 shadow-xl mx-auto my-0">
      <figure className="px-12 pt-12 overflow-hidden">
        <img
          src={props.avatar ? props.avatar : placeholder}
          alt="avatar"
          className="rounded-full object-cover w-[10rem]"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">
          Dr.{" "}
          <span className="first-letter:capitalize">
            {props?.name ? props.name : ""}
          </span>{" "}
        </h2>
        {/* <p>{props?.email ? props.email : ""}</p> */}
        <p>{props?.speciality ? props.speciality : ""}</p>
        <p>{props?.rating ? props.rating : "✩"}</p>
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
