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

    const ADMIN_SECRET = "m@ster@dmin@1432"; // 🔐 change here

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

        // 🔥 ROLE MISMATCH BLOCK
        if (user.role !== role) {
          alert("Invalid role selected ❌");
          return;
        }

        // 🔥 ADMIN SECRET STRICT CHECK
        if (user.role === "admin") {
          if (!adminSecret || adminSecret !== ADMIN_SECRET) {
            alert("Admin Secret Required ❌");
            return;
          }
        }

        // ✅ SAVE DATA
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("user", JSON.stringify(user));

        alert("Login successful 🚀");

        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }

      } catch {
        alert("Login failed ❌");
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
              <h2 className="text-2xl font-bold">Sign In</h2>
              <p className="text-gray-500 text-sm">
                Welcome back to Smart Student Lab
              </p>
            </div>

            {/* EMAIL */}
            <input
              className="input"
              placeholder="📧 Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* PASSWORD */}
            <input
              className="input"
              type="password"
              placeholder="🔒 Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

            {/* 🔥 ADMIN SECRET */}
            {role === "admin" && (
              <input
                className="input mt-3"
                type="password"
                placeholder="🔐 Admin Secret Key"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
              />
            )}

            {/* BUTTON */}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-800 text-white py-3 rounded-lg mt-4 hover:bg-blue-900"
            >
              Sign In
            </button>

            {/* LINK */}
            <p className="text-center mt-4 text-sm">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-blue-600 cursor-pointer"
              >
                Register
              </span>
            </p>

          </div>
        </div>
      </>
    );
  }