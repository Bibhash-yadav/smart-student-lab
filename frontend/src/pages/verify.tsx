import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Verify() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const email = new URLSearchParams(useLocation().search).get("email");

  const handleVerify = async () => {
    try {
      if (!otp || otp.length !== 4) {
        alert("Enter valid 4-digit OTP ❌");
        return;
      }

      setLoading(true);

      await API.post("/auth/verify-otp", { email, otp });

      alert("Email Verified ✅");
      navigate("/login");

    } catch (err: any) {
      alert(
        err.response?.data?.detail || 
        err.response?.data?.message || 
        "Invalid OTP ❌"
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
              🔐
            </div>
            <h2 className="text-2xl font-bold">Verify Email</h2>
            <p className="text-gray-300 text-sm">
              Enter the 4-digit OTP sent to your email
            </p>
          </div>

          {/* OTP INPUT */}
          <input
            className="w-full p-3 rounded-xl mb-4 bg-white/20 outline-none text-white placeholder-gray-300 focus:ring-2 focus:ring-cyan-400 text-center tracking-[8px] text-lg"
            maxLength={4}
            placeholder="----"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          {/* BUTTON */}
          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black py-3 rounded-xl font-semibold shadow-[0_0_20px_rgba(34,211,238,0.7)] hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP 🚀"}
          </button>

          {/* BACK */}
          <p className="text-center mt-4 text-sm text-gray-300">
            Go back to{" "}
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