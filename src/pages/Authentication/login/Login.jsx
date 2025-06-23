import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Login = () => {
  const [show, setShow] = useState(false);
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();


      
       async function login() {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/security/login", {
        username,
        password,
      });

      const jwt = response.data; // Adjust this if your backend wraps token inside a key like { token: "..." }
      localStorage.setItem("token", jwt);
      alert("Welcome!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Signin failed:", error);
      alert("Signin failed. Please check your credentials or try again later.");
    }
  }


   return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 w-screen overflow-x-hidden">
    <div className="bg-white shadow-xl rounded-xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
      
      {/* Left: Login Form */}
      <div className="w-full md:w-1/2 p-8">
        <h1 className="text-2xl font-bold text-center mb-2">Login</h1>
        <p className="text-center text-gray-600 mb-6">Welcome back!</p>

        <div className="space-y-4">
          <input
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="relative w-full">
            <input
              className="w-full px-4 py-2 pr-16 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Password"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={() => setShow(!show)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:underline"
              type="button"
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>

          <button
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            onClick={login}
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-700">
            New user?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 p-6 items-center justify-center">
        <img
          src="/E-Wallet-bro.png"
          alt="Login illustration"
          className="max-h-[400px] object-contain max-w-full"
        />
      </div>
    </div>
  </div>
);


};

export default Login;
