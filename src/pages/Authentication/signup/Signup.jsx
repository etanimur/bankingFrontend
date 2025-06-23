import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Signup = () => {
  const [show, setShow] = useState(false); // show/hide password
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    firstName: "",
    lastName: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  async function signup() {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/security/register", formData);
      alert("Registration successful!");
      navigate('/login');
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Something went wrong. Please try again.");
    }
  }



  

return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 w-screen overflow-x-hidden">
    <div className="bg-white shadow-xl rounded-xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
      
      <div className="w-full md:w-1/2 p-8">
        <h2 className="text-2xl font-bold text-center mb-2">Signup</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Please sign up to create an account
        </p>
        
        <div className="space-y-4">
          <input className="w-full px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
          <input className="w-full px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
          <input className="w-full px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
          <input className="w-full px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Username" name="userName" value={formData.userName} onChange={handleChange} />
          
          <div className="relative">
            <input
              className="w-full px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Password"
              type={show ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 text-sm"
              onClick={() => setShow(!show)}
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>

          <input className="w-full px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Mobile Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />

          <button onClick={signup} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Signup</button>

          <p className="text-center text-sm text-gray-700">
            Already have an account?{" "}
            <span onClick={() => navigate('/login')} className="text-blue-600 hover:underline cursor-pointer">Login</span>
          </p>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 p-6 items-center justify-center">
        <img
          src="/E-Wallet-bro.png"
          alt="Signup illustration"
          className="max-h-[400px] object-contain max-w-full"
        />
      </div>
    </div>
  </div>
);



};

export default Signup;
