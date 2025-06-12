import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/statistics" element={<Dashboard />} />
        <Route path="/cards" element={<Dashboard />} />
        <Route path="/banking" element={<Dashboard />} />
        <Route path="/settings" element={<Dashboard />} />
        <Route path="/profile" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
