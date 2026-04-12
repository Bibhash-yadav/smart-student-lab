import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function MyTasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first ❌");
        navigate("/login");
        return;
      }

      const res = await API.get("/tasks/my-tasks");
      setTasks([...res.data].reverse());

    } catch (err: any) {
      if (err.response?.status === 401) {
        alert("Session expired ❌");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert("Failed to load tasks ❌");
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#06b6d4] text-white">

      <Navbar />

      {/* MAIN */}
      <div className="flex-grow px-6 py-10 max-w-5xl mx-auto relative">

        {/* 3D GLOW */}
        <div className="absolute w-[400px] h-[400px] bg-cyan-400/20 blur-3xl rounded-full top-[-100px] left-[-100px]"></div>
        <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]"></div>

        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
          📊 My Tasks
        </h1>

        {tasks.length === 0 ? (
          <div className="text-center text-gray-300 mt-10">
            No tasks found 🚀
          </div>
        ) : (
          <div className="grid gap-6">
            {tasks.map((t) => (
              <div
                key={t.id}
                className="backdrop-blur-xl bg-white/10 border border-white/10 p-6 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:scale-[1.02] transition flex flex-col justify-between"
              >
                <div>
                  <h2 className="font-semibold text-xl text-cyan-300">
                    {t.service_type}
                  </h2>

                  <div className="flex flex-wrap gap-3 mt-4 text-sm">

                    {/* STATUS */}
                    <span className={`px-3 py-1 rounded-full font-medium ${
                      t.status === "Pending"
                        ? "bg-yellow-400/20 text-yellow-300"
                        : t.status === "In Progress"
                        ? "bg-blue-400/20 text-blue-300"
                        : t.status === "Completed"
                        ? "bg-purple-400/20 text-purple-300"
                        : "bg-green-400/20 text-green-300"
                    }`}>
                      {t.status}
                    </span>

                    {/* PAYMENT */}
                    <span className={`px-3 py-1 rounded-full font-medium ${
                      t.payment_status === "Pending"
                        ? "bg-red-400/20 text-red-300"
                        : "bg-green-400/20 text-green-300"
                    }`}>
                      {t.payment_status}
                    </span>

                    {/* PRIORITY */}
                    <span className="bg-white/10 px-3 py-1 rounded-full">
                      {t.priority}
                    </span>

                    {/* DEADLINE */}
                    <span className="bg-white/10 px-3 py-1 rounded-full">
                      📅 {t.deadline}
                    </span>

                  </div>

                  {/* ADMIN MESSAGE */}
                  {t.admin_message && (
                    <div className="mt-4 p-3 bg-purple-500/10 border-l-4 border-purple-400 text-sm rounded">
                      💬 {t.admin_message}
                    </div>
                  )}
                </div>

                {/* 🔥 CHAT BUTTON */}
                <button
                  onClick={() => navigate("/chat", { state: { taskId: t.id } })}
                  className="mt-6 w-full py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold shadow-[0_0_15px_rgba(34,211,238,0.7)] hover:scale-105 transition"
                >
                  Chat About Task 💬
                </button>

              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}