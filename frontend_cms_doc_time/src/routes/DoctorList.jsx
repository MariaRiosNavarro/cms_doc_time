import { useEffect, useState } from "react";
import DoctorCard from "../components/Doctor/DoctorCard";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/api/doctors"
        );
        if (response.ok) {
          const json = await response.json();
          setDoctors(json.data);
        } else {
          console.log("nein.....");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchAllDoctors();
  }, []);

  return (
    <>
      <section>
        {doctors?.map((doc) => (
          <DoctorCard key={doc._id} {...doc} link="/doctor/" />
        ))}
      </section>
    </>
  );
};

export default DoctorList;
