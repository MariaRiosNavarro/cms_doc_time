import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoctorLogin from "./routes/DoctorLogin";
import Header from "./components/Header.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<DoctorLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
