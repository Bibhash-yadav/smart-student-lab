import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [adminSecret, setAdminSecret] = useState("");

  const navigate = useNavigate();

  const ADMIN_SECRET = "m@ster@dmin@1432";

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      if (res.data.error) {
        alert(res.data.error);
        return;
      }

      const user = res.data.user;

      if (user.role !== role) {
        alert("Invalid role selected ❌");
        return;
      }

      if (user.role === "admin") {
        if (!adminSecret || adminSecret !== ADMIN_SECRET) {
          alert("Admin Secret Required ❌");
          return;
        }
      }

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(user));

      

      if (user.role === "admin") navigate("/admin");
      else navigate("/");
    } catch (err: any) {
  alert(
    err.response?.data?.detail || 
    err.response?.data?.message || 
    "Login failed ❌"
  );
}
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#06b6d4] relative overflow-hidden">

        {/* 3D GLOW BACKGROUND */}
        <div className="absolute w-[400px] h-[400px] bg-cyan-400/30 blur-3xl rounded-full top-[-100px] left-[-100px] animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-purple-500/30 blur-3xl rounded-full bottom-[-100px] right-[-100px] animate-pulse"></div>

        {/* CARD */}
        <div className="relative w-full max-w-md p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] text-white">

          {/* HEADER */}
          <div className="text-center mb-6">
            <div className="text-4xl mb-2 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
              🎓
            </div>
            <h2 className="text-2xl font-bold">Sign In</h2>
            <p className="text-gray-300 text-sm">
              Welcome back to Student Store
            </p>
          </div>

          {/* EMAIL */}
          <input
            className="w-full p-3 rounded-xl mb-3 bg-white/20 outline-none text-white placeholder-gray-300 focus:ring-2 focus:ring-cyan-400"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <input
            className="w-full p-3 rounded-xl mb-3 bg-white/20 outline-none text-white placeholder-gray-300 focus:ring-2 focus:ring-cyan-400"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ROLE */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setRole("student")}
              className={`w-full py-2 rounded-xl transition ${
                role === "student"
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-lg"
                  : "bg-white/20"
              }`}
            >
              Student
            </button>

            <button
              onClick={() => setRole("admin")}
              className={`w-full py-2 rounded-xl transition ${
                role === "admin"
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-lg"
                  : "bg-white/20"
              }`}
            >
              Admin
            </button>
          </div>

          {/* ADMIN SECRET */}
          {role === "admin" && (
            <input
              className="w-full p-3 rounded-xl mt-3 bg-white/20 outline-none text-white placeholder-gray-300 focus:ring-2 focus:ring-cyan-400"
              type="password"
              placeholder="Admin Secret Key"
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
            />
          )}

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black py-3 rounded-xl mt-5 font-semibold shadow-[0_0_20px_rgba(34,211,238,0.7)] hover:scale-105 transition"
          >
            Sign In 🚀
          </button>

          {/* LINK */}
          <p className="text-center mt-4 text-sm text-gray-300">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-cyan-300 cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>

        </div>
      </div>
    </>
  );
}