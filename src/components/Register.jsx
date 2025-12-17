import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, { name, email, password });
      toast.success(res.data?.message || "Registered successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center bg-gray-400 px-4 pt-12 pb-6">
        <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4">
          <h2 className="text-3xl font-bold text-center">Register</h2>

          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter name" className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter email" className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Create a password" className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <button type="submit" className="w-full bg-rose-800 text-white px-4 py-3 rounded-lg text-base font-semibold hover:bg-rose-700 transition">Register</button>
        </form>
      </div>

      <ToastContainer position="top-right" />
    </>
  );
};

export default Register;
