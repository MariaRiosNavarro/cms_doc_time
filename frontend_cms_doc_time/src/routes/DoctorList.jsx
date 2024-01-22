import { useEffect, useState } from "react";
import Card from "../components/General/Card";

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
      <h1>DoctorList</h1>
      <section>
        {doctors?.map((doc) => (
          <Card key={doc._id} {...doc} link="/doctor/" />
        ))}
      </section>
    </>
  );
};

export default DoctorList;