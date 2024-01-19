import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DoctorAppointmentsCheck = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(count);
  }, [count]);

  return (
    <>
      <h1>DoctorAppointmentsCheck</h1>
      <section>
        <article>
          <button
            onClick={() => {
              setCount(count + 1);
            }}
          >
            click +1
          </button>
          <p>{count}</p>
          <Link to="/">See More</Link>
        </article>
      </section>
    </>
  );
};

export default DoctorAppointmentsCheck;
