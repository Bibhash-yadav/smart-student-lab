import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Register() {
  const [form, setForm] = useState<any>({});
  const [role, setRole] = useState("student");
  const [adminSecret, setAdminSecret] = useState(""); // 🔥 NEW

  const navigate = useNavigate();

  const ADMIN_SECRET = "m@ster@dmin@1432"; // 🔐 SAME AS LOGIN

  const handleRegister = async () => {
    try {
      // 🔥 BLOCK FAKE ADMIN
      if (role === "admin") {
        if (!adminSecret || adminSecret !== ADMIN_SECRET) {
          alert("Invalid Admin Secret ❌");
          return;
        }
      }

      const res = await API.post("/auth/register", {
        ...form,
        role,
      });

      if (res.data.error) {
        alert(res.data.error);
        return;
      }

      alert("Account created successfully ✅");
      navigate("/login");

    } catch {
      alert("Registration failed ❌");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

          {/* HEADER */}
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🎓</div>
            <h2 className="text-2xl font-bold">Create Account</h2>
            <p className="text-gray-500 text-sm">
              Register to start submitting tasks
            </p>
          </div>

          {/* NAME */}
          <input
            className="input"
            placeholder="👤 Full Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          {/* EMAIL */}
          <input
            className="input"
            placeholder="📧 Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* PASSWORD */}
          <input
            type="password"
            className="input"
            placeholder="🔒 Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {/* ROLE */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setRole("student")}
              className={`w-full py-2 rounded-lg ${
                role === "student"
                  ? "bg-blue-700 text-white"
                  : "bg-gray-200"
              }`}
            >
              Student
            </button>

            <button
              onClick={() => setRole("admin")}
              className={`w-full py-2 rounded-lg ${
                role === "admin"
                  ? "bg-blue-700 text-white"
                  : "bg-gray-200"
              }`}
            >
              Admin
            </button>
          </div>

          {/* 🔥 ADMIN SECRET FIELD */}
          {role === "admin" && (
            <input
              type="password"
              className="input mt-3"
              placeholder="🔐 Admin Secret Key"
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
            />
          )}

          {/* BUTTON */}
          <button
            onClick={handleRegister}
            className="w-full bg-blue-800 text-white py-3 rounded-lg mt-4 hover:bg-blue-900"
          >
            Create Account
          </button>

          {/* LINK */}
          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 cursor-pointer"
            >
              Sign In
            </span>
          </p>

        </div>
      </div>
    </>
  );
}