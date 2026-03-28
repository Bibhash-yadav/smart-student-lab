import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

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

      setTasks(res.data.reverse());

    } catch (err: any) {
      console.log(err.response?.data);

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
    <>
      <Navbar />

      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">📊 My Tasks</h1>

        {tasks.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No tasks found 🚀
          </div>
        ) : (
          <div className="grid gap-4">
            {tasks.map((t) => (
              <div
                key={t.id}
                className="bg-white p-5 rounded-xl shadow border"
              >
                <h2 className="font-semibold text-lg">
                  {t.service_type}
                </h2>

                <div className="flex flex-wrap gap-3 mt-3 text-sm">

                  {/* STATUS */}
                  <span className={`px-3 py-1 rounded-full ${
                    t.status === "Pending" ? "bg-yellow-100 text-yellow-600" :
                    t.status === "In Progress" ? "bg-blue-100 text-blue-600" :
                    t.status === "Completed" ? "bg-purple-100 text-purple-600" :
                    "bg-green-100 text-green-600"
                  }`}>
                    {t.status}
                  </span>

                  {/* PAYMENT */}
                  <span className={`px-3 py-1 rounded-full ${
                    t.payment_status === "Pending"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}>
                    {t.payment_status}
                  </span>

                  {/* PRIORITY */}
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    {t.priority}
                  </span>

                  {/* DEADLINE */}
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    📅 {t.deadline}
                  </span>

                </div>

                {/* 🔥 ADMIN MESSAGE */}
                {t.admin_message && (
                  <div className="mt-4 p-3 bg-purple-50 border-l-4 border-purple-500 text-sm">
                    💬 {t.admin_message}
                  </div>
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}