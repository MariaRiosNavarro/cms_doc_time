import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoctorLogin from "./routes/DoctorLogin";
import DoctorRegister from "./routes/DoctorRegister";
import Header from "./components/General/Header.jsx";
import DoctorDashboardPage from "./routes/DoctorDashboardPage.jsx";
import DoctorAppointmentsCheck from "./routes/DoctorAppointmentsCheck.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<DoctorLogin />} />
          <Route path="/register" element={<DoctorRegister />} />
          <Route path="/doctor/:id" element={<DoctorDashboardPage />} />
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
