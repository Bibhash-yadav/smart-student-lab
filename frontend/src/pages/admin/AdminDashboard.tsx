import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import StatsCard from "../../components/StatsCard";

export default function AdminDashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [messages, setMessages] = useState<{ [key: string]: string }>({}); // ✅ NEW
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("tasks");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const res = await API.get("/tasks/");
    setTasks([...res.data].reverse());
  };

  const fetchContacts = async () => {
    const res = await API.get("/contact/");
    setContacts([...res.data].reverse());
  };

  useEffect(() => {
    fetchTasks();
    fetchContacts();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "paid") return task.payment_status === "Verified";
    if (filter === "pending") return task.status === "Pending";
    if (filter === "urgent") return task.priority === "Urgent";
    return true;
  });

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const pending = tasks.filter(t => t.status === "Pending").length;
  const revenue = tasks.filter(t => t.payment_status === "Verified").length;

  const verifyPayment = async (id: string) => {
    await API.put(`/tasks/verify-payment/${id}`);
    fetchTasks();
  };

  const updateStatus = async (id: string, status: string) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  // ✅ SEND MESSAGE FUNCTION
  const sendMessage = async (id: string) => {
    await API.put(`/tasks/${id}`, {
      admin_message: messages[id]
    });
    fetchTasks();
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <AdminSidebar setFilter={setFilter} logout={logout} />

      <div className="w-full md:ml-64 p-4 md:p-6">

        {/* SWITCH */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setView("tasks")}
            className={`px-4 py-2 rounded-lg ${
              view === "tasks" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            📋 Tasks
          </button>

          <button
            onClick={() => setView("contacts")}
            className={`px-4 py-2 rounded-lg ${
              view === "contacts" ? "bg-purple-600 text-white" : "bg-gray-200"
            }`}
          >
            📩 Contact Messages
          </button>
        </div>

        {/* TASK VIEW */}
        {view === "tasks" && (
          <>
            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatsCard title="Total Tasks" value={total} color="bg-blue-500" />
              <StatsCard title="Completed" value={completed} color="bg-green-500" />
              <StatsCard title="Pending" value={pending} color="bg-yellow-500" />
              <StatsCard title="Revenue" value={`₹${revenue * 200}`} color="bg-purple-500" />
            </div>

            {/* TASK LIST */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-5 rounded-xl shadow ${
                    task.status === "Completed"
                      ? "bg-green-50 border border-green-400"
                      : "bg-white"
                  }`}
                >

                  {/* HEADER */}
                  <div className="flex justify-between items-center">
                    <h2 className="font-bold">{task.service_type}</h2>

                    <span className={`px-2 py-1 text-xs rounded ${
                      task.status === "Completed"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}>
                      {task.status}
                    </span>
                  </div>

                  <p>{task.name}</p>
                  <p className="text-sm">📧 {task.email}</p>
                  <p className="text-sm">📱 {task.phone}</p>

                  <p className="text-sm mt-2">{task.description}</p>

                  {/* PAYMENT */}
                  <span className="inline-block mt-2 px-2 py-1 bg-green-200 text-xs rounded">
                    {task.payment_status}
                  </span>

                  {/* 🔥 ADMIN MESSAGE INPUT */}
                  <div className="mt-4 flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="Type message for student..."
                      className="border p-2 rounded"
                      value={messages[task.id] || ""}
                      onChange={(e) =>
                        setMessages({ ...messages, [task.id]: e.target.value })
                      }
                    />

                    <button
                      onClick={() => sendMessage(task.id)}
                      className="bg-purple-600 text-white py-1 rounded"
                    >
                      📩 Send Message
                    </button>
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-4 flex flex-col gap-2">

                    <button
                      onClick={() => updateStatus(task.id, "Completed")}
                      className="bg-green-600 text-white py-1 rounded"
                    >
                      ✅ Mark Completed
                    </button>

                    <button
                      onClick={() => verifyPayment(task.id)}
                      className="bg-blue-600 text-white py-1 rounded"
                    >
                      💰 Verify Payment
                    </button>

                    <div className="flex flex-wrap gap-2 mt-2">
                      <button
                        onClick={() => updateStatus(task.id, "In Progress")}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        🚀 Start
                      </button>

                      <button
                        onClick={() => updateStatus(task.id, "Delivered")}
                        className="bg-black text-white px-3 py-1 rounded"
                      >
                        📦 Deliver
                      </button>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          </>
        )}

        {/* CONTACT VIEW */}
        {view === "contacts" && (
          <div className="grid gap-4">
            {contacts.length === 0 ? (
              <p className="text-gray-500 text-center mt-20">
                No messages yet 👀
              </p>
            ) : (
              contacts.map((c) => (
                <div key={c.id} className="bg-white p-5 rounded-xl shadow">
                  <h2 className="font-semibold">👤 {c.name}</h2>
                  <p className="text-blue-600 text-sm">📧 {c.email}</p>
                  <p className="mt-2">{c.message}</p>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}