import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  const [hide, setHide] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({ email: "", password: "" });

  const handleHide = () => setHide(!hide);

  const handleForm = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { email, password } = data;
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:0100/user/login", { email, password });
      console.log("Login successful", response.data);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Login to Your Account</h1>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        
        <label className="block text-gray-700">Email Address</label>
        <input
          type="email"
          name="email"
          onChange={handleForm}
          className="w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mt-4 text-gray-700">Password</label>
        <div className="relative">
          <input
            type={hide ? "password" : "text"}
            name="password"
            onChange={handleForm}
            className="w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span
            className="absolute top-3 right-3 text-gray-500 cursor-pointer"
            onClick={handleHide}
          >
            {hide ? <FaRegEye /> : <FaRegEyeSlash />}
          </span>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span>Remember me</span>
          </label>
          <span className="text-blue-500 cursor-pointer">Forgot password?</span>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 transition"
        >
          Login
        </button>

        <div className="text-center mt-4 text-sm">
          <span>Not have an account? </span>
          <span className="text-red-500 cursor-pointer" onClick={props.x}>Sign Up</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
