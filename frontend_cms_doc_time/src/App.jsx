import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLogin from "./routes/UserLogin.jsx";
import UserSignUp from "./routes/UserSignUp.jsx";
import Header from "./components/General/Header.jsx";
import DoctorDashboardPage from "./routes/DoctorDashboardPage.jsx";
import AdminDashboardPage from "./routes/AdminDashboardPage.jsx";
import PatientDashboardPage from "./routes/PatientDashboardPage.jsx";
import DoctorAppointmentsCheck from "./routes/DoctorAppointmentsCheck.jsx";
import Home from "./components/General/Home.jsx";
import DoctorDetail from "./components/Doctor/DoctorDetail.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Free Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/sign-up" element={<UserSignUp />} />
          <Route path="/doctor:id" element={<DoctorDetail />} />

          {/* Route only for Patient & Admin */}
          <Route
            path="/patient-dashboard/:id"
            element={<PatientDashboardPage />}
          />
          {/* Routes only for Doctor & Admin */}
          <Route
            path="/doctor-dashboard/:id"
            element={<DoctorDashboardPage />}
          />
          <Route
            path="/doctor-dashboard/:id/appointments-check"
            element={<DoctorAppointmentsCheck />}
          />
          {/* Routes only for Admin */}
          <Route path="/admin/:id" element={<AdminDashboardPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
