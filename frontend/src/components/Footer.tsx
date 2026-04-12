import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="w-full mt-10 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#06b6d4] text-white relative overflow-hidden">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute w-[400px] h-[400px] bg-cyan-400/20 blur-3xl rounded-full top-[-100px] left-[-100px]"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]"></div>

      {/* ✅ FULL WIDTH CONTENT */}
      <div className="relative w-full py-10 px-6 md:px-12 lg:px-20 text-center backdrop-blur-xl bg-white/5 border-t border-white/10">

        {/* EMAIL */}
        <p className="text-sm text-gray-300">
          Contact:{" "}
          <span className="text-cyan-300 font-medium">
            studentstore142@gmail.com
          </span>
        </p>

        {/* SOCIAL ICONS */}
        <div className="flex justify-center gap-8 mt-6 text-2xl">

          <div className="p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/10 shadow-lg hover:scale-110 transition cursor-pointer">
            <FaWhatsapp className="text-green-400" />
          </div>

          <div className="p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/10 shadow-lg hover:scale-110 transition cursor-pointer">
            <FaInstagram className="text-pink-400" />
          </div>

          <div className="p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/10 shadow-lg hover:scale-110 transition cursor-pointer">
            <FaFacebook className="text-blue-400" />
          </div>

        </div>

        {/* COPYRIGHT */}
        <p className="mt-6 text-xs text-gray-400">
          © {new Date().getFullYear()} Student Store • All rights reserved
        </p>

      </div>
    </div>
  );
}