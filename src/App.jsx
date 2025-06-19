import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import { PaymentForm } from "./pages/PaymentForm/PaymentForm";

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
        <Route path="/paymentform" element={<PaymentForm />} />
        <Route path="/t" element={<PaymentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
