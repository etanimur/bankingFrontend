import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import TransferForm from "./pages/dashboard/transfer/TransferForm";
import Login from "./pages/Authentication/login/login";
import Signup from "./pages/Authentication/signup/signup";
import Transactions from "./pages/Transactions/Transactions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/transfer" element={<TransferForm />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/profile" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
