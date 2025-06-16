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
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="flex flex-col gap-3 p-6 bg-white shadow-lg rounded-md w-[90%] max-w-md">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold mb-2 text-center">Signup</h1>
          <p className="text-center text-gray-600">Please sign up to create an account</p>
        </div>
        <div className="flex flex-col gap-3">
          <input
            className="border border-gray-300 px-4 py-2 rounded-lg bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            className="border border-gray-300 px-4 py-2 rounded-lg bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            className="border border-gray-300 px-4 py-2 rounded-lg bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="border border-gray-300 px-4 py-2 rounded-lg bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Username"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
          <div className="relative w-full">
            <input
              className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Password"
              type={show ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 hover:underline"
              onClick={() => setShow(!show)}
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
          <input
            className="border border-gray-300 px-4 py-2 rounded-lg bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Mobile Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <button
            className="border bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            onClick={signup}
          >
            Signup
          </button>
          <p className="text-sm text-center text-gray-700">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
