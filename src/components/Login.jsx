import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/auth/login", { email, password });
      const { token, role } = res.data;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("user", email);
      sessionStorage.setItem("isLoggedIn", "true");
      toast.success("Login successful");
      if (role === "admin") navigate("/admin");
      else navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center bg-gray-400 px-4 pt-12 pb-6">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4 mt-6">
          <h2 className="text-3xl font-bold text-center mb-1">Login</h2>
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter Email" className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"/>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter Password" className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"/>
          </div>

          <button type="submit" className="w-full bg-rose-800 text-white px-4 py-3 rounded-lg text-base font-semibold hover:bg-rose-700 transition">Login</button>
        </form>
      </div>

      <ToastContainer position="top-right" />
    </>
  );
};

export default Login;




