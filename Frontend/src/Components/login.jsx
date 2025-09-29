import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import email_icon from "../Assets/email.png"
import password_icon from "../Assets/password.png"


const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
        const { data } = await axios.post("http://localhost:8000/auth/login", formData);
        console.log(data);
        alert("Logged in successfully!");
        localStorage.setItem("token", data.access_token);
        navigate("/");
      } catch (error) {
        console.error(error);
        if (error.response) {
            setError(error.response.data.detail || "Invalid credentials");
        } else {
            setError("Network error. Please try again.");
        }
    }
};

return (
    <div className="flex justify-center align-center mt-6">
    <div className="bg-indigo-100 w-96 p-8 rounded-xl shadow-lg"> 

    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
    {error && <p className="text-red-400 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex item-center">
            <img src={email_icon} alt="" className="m-2 w-6 h-7"/>
            <input
               type="email"
               name="email"
               placeholder="Email"
               value={formData.email}
               onChange={handleChange}
               className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
               required
            />
        </div>
        <div className="flex item-center">
            <img src={password_icon} alt="" className="m-2 w-6 h-7"/>
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
            />
        </div>
        <button type="submit" className=" w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-semibold">Login</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
