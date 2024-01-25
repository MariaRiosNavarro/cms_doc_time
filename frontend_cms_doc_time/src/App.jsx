import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/General/Home.jsx";
import Header from "./components/General/Header.jsx";
import UserLogin from "./routes/UserLogin.jsx";
import UserSignUp from "./routes/UserSignUp.jsx";
import DoctorDashboardPage from "./routes/DoctorDashboardPage.jsx";
import AdminDashboardPage from "./routes/AdminDashboardPage.jsx";
import PatientDashboardPage from "./routes/PatientDashboardPage.jsx";
import DoctorList from "./routes/DoctorList.jsx";
import UserList from "./routes/UserList.jsx";
import UserForm from "./routes/UserForm.jsx";
// import DoctorDetailPage from "./routes/DoctorDetailPage.jsx";
import DoctorProtectorRoutes from "./routes/Protectors/DoctorProtectorRoutes.jsx";
import PatientProtectorRoutes from "./routes/Protectors/PatientProtectorRoutes.jsx";
import AdminProtectorRoutes from "./routes/Protectors/AdminProtectorRoutes.jsx";
// import PatientDashboardOneDoctor from "./routes/PatientDashboardOneDoctor.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Free Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/sign-up" element={<UserSignUp />} />
          <Route path="/login" element={<UserLogin />} />
          {/* Protected Routes & LoginProvider to know how is login */}

          {/* Route only for Patient */}
          <Route element={<PatientProtectorRoutes />}>
            <Route
              path="patient-dashboard/:patientId"
              element={<PatientDashboardPage />}
            />
          </Route>

          <Route element={<DoctorProtectorRoutes />}>
            {/* Routes only for Doctors*/}
            <Route
              path="/doctor-dashboard/:doctorId"
              element={<DoctorDashboardPage />}
            />
          </Route>
          {/* Routes only for Admin */}
          <Route element={<AdminProtectorRoutes />}>
            <Route path="/admin-dashboard" element={<AdminDashboardPage />}>
              <Route path="users" element={<UserList />} />
              {/* <Route path="/appointments" element={<AppointmentsList />} /> */}
              <Route path="add" element={<UserForm />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
