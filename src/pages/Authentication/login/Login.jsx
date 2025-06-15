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
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="flex flex-col gap-3 p-6 bg-white shadow-lg rounded-md w-[90%] max-w-md">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold mb-2 text-center">Login</h1>
          <p className="text-center text-gray-600">Welcome back!</p>
        </div>
        <div className="flex flex-col gap-3">
          <input
            className="border border-gray-300 px-4 py-2 rounded-lg bg-gray-100 placeholder-gray-500  focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="username"
            value={username}
            onChange={(e)=>{
                setUsername(e.target.value)
            }}
          />
          <div className="relative w-full">
            <input
              className="w-full border border-gray-300 px-4 py-2 pr-16 rounded-lg bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Password"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e)=>{
                   setPassword(e.target.value)
              }}
            />
            <button
              onClick={() => setShow(!show)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:underline"
              type="button"
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button className="border bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
           onClick={login}>
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
    </div>
  );
};

export default Login;
