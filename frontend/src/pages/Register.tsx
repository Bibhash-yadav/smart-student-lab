import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [role, setRole] = useState("student");
  const [adminSecret, setAdminSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const ADMIN_SECRET = "m@ster@dmin@1432";

  const handleRegister = async () => {
    try {
      if (!form.name || !form.email || !form.password) {
        alert("All fields are required ❌");
        return;
      }

      if (role === "admin") {
        if (!adminSecret || adminSecret !== ADMIN_SECRET) {
          alert("Invalid Admin Secret ❌");
          return;
        }
      }

      setLoading(true);

      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: role,
        adminSecret: adminSecret,
      };

      // 🔥 REGISTER API CALL
      const res = await API.post("/auth/register", payload);

      alert(res.data.message || "OTP sent to your email 📩");

      // 👉 Redirect to verify page with email
      navigate(`/verify?email=${form.email}`);

    } catch (err: any) {
      alert(
  err.response?.data?.detail || 
  err.response?.data?.message || 
  "Registration failed ❌"
);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#06b6d4] relative overflow-hidden">

        {/* GLOW BACKGROUND */}
        <div className="absolute w-[400px] h-[400px] bg-cyan-400/30 blur-3xl rounded-full top-[-100px] left-[-100px] animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-purple-500/30 blur-3xl rounded-full bottom-[-100px] right-[-100px] animate-pulse"></div>

        {/* CARD */}
        <div className="relative w-full max-w-md p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] text-white">

          {/* HEADER */}
          <div className="text-center mb-6">
            <div className="text-4xl mb-2 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
              🎓
            </div>
            <h2 className="text-2xl font-bold">Create Account</h2>
            <p className="text-gray-300 text-sm">
              Register to start submitting tasks
            </p>
          </div>

          {/* NAME */}
          <input
            className="w-full p-3 rounded-xl mb-3 bg-white/20 outline-none text-white placeholder-gray-300 focus:ring-2 focus:ring-cyan-400"
            placeholder="Full Name"
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          {/* EMAIL */}
          <input
            className="w-full p-3 rounded-xl mb-3 bg-white/20 outline-none text-white placeholder-gray-300 focus:ring-2 focus:ring-cyan-400"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* PASSWORD */}
          <input
            type="password"
            className="w-full p-3 rounded-xl mb-3 bg-white/20 outline-none text-white placeholder-gray-300 focus:ring-2 focus:ring-cyan-400"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
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
              type="password"
              className="w-full p-3 rounded-xl mt-3 bg-white/20 outline-none text-white placeholder-gray-300 focus:ring-2 focus:ring-cyan-400"
              placeholder="Admin Secret Key"
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
            />
          )}

          {/* BUTTON */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black py-3 rounded-xl mt-5 font-semibold shadow-[0_0_20px_rgba(34,211,238,0.7)] hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account 🚀"}
          </button>

          {/* LINK */}
          <p className="text-center mt-4 text-sm text-gray-300">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-cyan-300 cursor-pointer hover:underline"
            >
              Sign In
            </span>
          </p>

        </div>
      </div>
    </>
  );
}