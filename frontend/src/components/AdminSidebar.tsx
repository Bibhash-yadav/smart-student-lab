import { useNavigate, useLocation } from "react-router-dom";

export default function AdminSidebar({ setFilter, logout }: any) {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 ACTIVE STYLE
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-gradient-to-b from-black to-gray-900 text-white p-6 fixed h-full hidden md:flex flex-col">

      {/* TITLE */}
      <h1 className="text-xl font-bold mb-8">🎓 Admin Panel</h1>

      {/* MENU */}
      <div className="flex flex-col gap-3">

        <button
          onClick={() => setFilter("all")}
          className="text-left px-3 py-2 rounded-lg hover:bg-white/10 transition"
        >
          📋 All Tasks
        </button>

        <button
          onClick={() => setFilter("paid")}
          className="text-left px-3 py-2 rounded-lg hover:bg-white/10 transition"
        >
          💰 Paid
        </button>

        <button
          onClick={() => setFilter("pending")}
          className="text-left px-3 py-2 rounded-lg hover:bg-white/10 transition"
        >
          ⏳ Pending
        </button>

        <button
          onClick={() => setFilter("urgent")}
          className="text-left px-3 py-2 rounded-lg hover:bg-white/10 transition"
        >
          ⚡ Urgent
        </button>

        {/* 🔥 CHAT */}
        <button
          onClick={() => navigate("/admin/chat")}
          className={`text-left px-3 py-2 rounded-lg transition ${
            isActive("/admin/chat")
              ? "bg-purple-600"
              : "hover:bg-white/10"
          }`}
        >
          💬 Chat
        </button>

      

      </div>

      {/* FOOTER */}
      <div className="mt-auto">

        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
        >
          Logout 🚪
        </button>

      </div>
    </div>
  );
}