import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoctorLogin from "./routes/DoctorLogin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<DoctorLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
