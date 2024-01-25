import { useEffect, useState } from "react";
import DoctorCard from "../components/Doctor/DoctorCard";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

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
      <section className="flex flex-col justify-center">
        <div className="flex p-4 mx-auto my-4 bg-gray-200 rounded-xl">
          <SearchSharpIcon />
          <input
            type="text"
            className=" bg-gray-200  px-4 placeholder:text-gray-400"
            placeholder="Search for doctors"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {doctors?.map((doc) => (
            <DoctorCard key={doc._id} {...doc} link="/doctor/" />
          ))}
        </div>
      </section>
    </>
  );
};

export default DoctorList;
