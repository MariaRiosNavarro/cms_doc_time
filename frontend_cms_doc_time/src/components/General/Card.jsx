/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div key={props._id} className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={props.avatar} alt="avatar" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{props?.name ? props.name : ""}</h2>
        <p>{props?.email ? props.email : ""}</p>
        <p>{props?.speciality ? props.speciality : ""}</p>
        <p>{props?.description ? props.description : ""}</p>
        <div className="card-actions">
          <Link to={props.link + props._id}>
            <button className="btn btn-primary">More {props._id}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
