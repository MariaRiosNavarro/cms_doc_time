import { useParams } from "react-router-dom";
import DoctorDetail from "../components/Doctor/DoctorDetail";

const DoctorDetailPage = () => {
  const { doctorId } = useParams();
  // const handleTest = () => {
  //   console.log("test");
  // };
  console.log("id in---------------- DoctorDetailPage ", doctorId);

  return (
    <>
      <DoctorDetail
        doctorId={doctorId}

        // btnFunction={handleTest}
        // btnMessage="Check Appointment"
      />
    </>
  );
};

export default DoctorDetailPage;
