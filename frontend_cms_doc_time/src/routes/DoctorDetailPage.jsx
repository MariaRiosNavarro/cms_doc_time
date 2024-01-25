import { useParams } from "react-router-dom";
import DoctorDetail from "../components/Doctor/DoctorDetail";

const DoctorDetailPage = () => {
  const { id } = useParams();
  // const handleTest = () => {
  //   console.log("test");
  // };
  console.log("id in---------------- DoctorDetailPage ", id);

  return (
    <>
      <DoctorDetail
        id={id}
        // btnFunction={handleTest}
        // btnMessage="Check Appointment"
      />
    </>
  );
};

export default DoctorDetailPage;
