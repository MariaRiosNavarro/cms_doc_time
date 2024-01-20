import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLogin from "./routes/UserLogin.jsx";
import UserSignUp from "./routes/UserSignUp.jsx";
import Header from "./components/General/Header.jsx";
import DoctorDashboardPage from "./routes/DoctorDashboardPage.jsx";
import AdminDashboardPage from "./routes/AdminDashboardPage.jsx";
import PatientDashboardPage from "./routes/PatientDashboardPage.jsx";
import DoctorAppointmentsCheck from "./routes/DoctorAppointmentsCheck.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/sign-up" element={<UserSignUp />} />
          <Route path="/doctor/:id" element={<DoctorDashboardPage />} />
          <Route path="/patient/:id" element={<PatientDashboardPage />} />
          <Route path="/admin/:id" element={<AdminDashboardPage />} />
          <Route
            path="/doctor/:id/appointments-check"
            element={<DoctorAppointmentsCheck />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
