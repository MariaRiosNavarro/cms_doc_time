/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const PatientCard = (props) => {
  const placeholder =
    "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";

  return (
    <div key={props._id} className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-12 pt-12 overflow-hidden">
        <img
          src={props.avatar ? props.avatar : placeholder}
          alt="avatar"
          className="rounded-full object-cover w-[10rem]"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">
          Name:
          <span className="font-bold pl-4">
            {props?.name ? props.name : ""}
          </span>
        </h2>
        <p>
          Email
          <span className="font-bold pl-4">
            {props?.email ? props.email : ""}
          </span>
        </p>
        <div className="card-actions">
          <div className="card-actions">
            <Link to={props.link}>
              <button className="btn btn-primary">More about</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
