import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoctorLogin from "./routes/DoctorLogin";
import DoctorRegister from "./routes/DoctorRegister";
import Header from "./components/Header.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<DoctorLogin />} />
          <Route path="/register" element={<DoctorRegister />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
