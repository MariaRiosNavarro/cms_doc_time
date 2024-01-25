import { useEffect, useState } from "react";
import DoctorCard from "../components/Doctor/DoctorCard";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
// import { useParams } from "react-router-dom";
import DoctorDetail from "../components/Doctor/DoctorDetail";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";

const DoctorList = () => {
  // const { patientId } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [detail, setDetail] = useState(false);

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

  const toggleDetail = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setDetail((prev) => !prev);
  };

  const backToList = () => {
    setSelectedDoctorId("");
    setDetail((prev) => !prev);
  };

  return (
    <>
      {detail ? (
        <section className="pt-8 relative">
          <ArrowBackIosNewSharpIcon
            className="absolute left-8 top-4"
            onClick={backToList}
          />
          <DoctorDetail doctorId={selectedDoctorId} />
        </section>
      ) : (
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
              <DoctorCard
                key={doc._id}
                {...doc}
                onClick={() => toggleDetail(doc._id)}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default DoctorList;
