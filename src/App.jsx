import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
import IncidentDetailPage from "./pages/IncidentPage";
// import AboutPage from "./pages/AboutPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IncidentDetailPage />} />
        {/* <Route path="/" element={<HomePage />} /> */}
        {/* <Route path="/about" element={<AboutPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
