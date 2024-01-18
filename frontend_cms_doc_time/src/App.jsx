import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoctorLogin from "./routes/DoctorLogin";
import DoctorRegister from "./routes/DoctorRegister";
import Header from "./components/Header.jsx";
import DoctorDashboardPage from "./routes/DoctorDashboardPage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<DoctorLogin />} />
          <Route path="/register" element={<DoctorRegister />} />
          <Route path="/doctor/:id" element={<DoctorDashboardPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
