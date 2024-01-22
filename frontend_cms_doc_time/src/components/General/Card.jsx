/* eslint-disable react/prop-types */

const Card = (props) => {
  const deleteUser = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/users/" + props._id,
        {
          method: "delete",
          credentials: "include",
        }
      );
      if (response.ok) {
        console.log("deleted");
      } else {
        console.log("no deleted");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div key={props._id} className="card w-96 bg-base-100 shadow-xl">
      <article className="card-body items-center text-center">
        <div className="card w-[75%] bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-center text-2xl ">
              <span className="font-bold pl-2 text-secondary">
                {props?.role ? props.role : "Unknown"}
              </span>
            </h2>
            <h3>
              Name:
              <span className="font-bold pl-2">
                {props?.name ? props.name : "Unknown"}
              </span>
            </h3>
            <p>
              Email:
              <span className="font-bold pl-2">
                {props?.email ? props.email : "Unknown"}
              </span>
            </p>
            <button
              className="btn btn-primary mx-auto my-0"
              onClick={deleteUser}
            >
              Delete User
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Card;
