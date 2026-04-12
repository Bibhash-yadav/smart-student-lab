import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SubmitTask() {
  const [form, setForm] = useState<any>({
    name: "",
    email: "",
    phone: "",
    service_type: "",
    custom_service: "",
    description: "",
    deadline: "",
    priority: "Normal",
    payment_method: "UPI"
  });

  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔥 LOGIN CHECK + START FROM TOP
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("⚠️ Please login first");
      navigate("/login");
      return;
    }

    // ✅ force scroll to top
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (key: string, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const submit = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.description ||
      !form.deadline ||
      (!form.service_type && !form.custom_service)
    ) {
      alert("⚠️ Please fill all required fields");
      return;
    }

    const data = new FormData();

    const finalService =
      form.service_type === "Other"
        ? form.custom_service
        : form.service_type;

    Object.keys(form).forEach((key) => {
      if (key !== "custom_service") {
        data.append(key, form[key]);
      }
    });

    data.append("service_type", finalService);

    if (file) {
      data.append("file", file);
    }

    try {
      setLoading(true);

      await API.post("/tasks/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Task Submitted Successfully 🚀");

      setForm({
        name: "",
        email: "",
        phone: "",
        service_type: "",
        custom_service: "",
        description: "",
        deadline: "",
        priority: "Normal",
        payment_method: "UPI"
      });

      setFile(null);

      // 🔥 go top after submit
      window.scrollTo(0, 0);

    } catch (err: any) {
      alert(err.response?.data?.detail || "❌ Error submitting task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#06b6d4] text-white">

      <Navbar />

      {/* MAIN */}
      <div className="flex-grow flex justify-center items-center px-4 py-10 relative overflow-hidden">

        {/* GLOW */}
        <div className="absolute w-[500px] h-[500px] bg-cyan-400/20 blur-3xl rounded-full top-[-120px] left-[-120px]"></div>
        <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full bottom-[-120px] right-[-120px]"></div>

        {/* CARD */}
        <div className="relative w-full max-w-2xl p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">

          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Submit Your Task 
          </h1>

          <input
            className="w-full p-3 rounded-xl mb-3 bg-white/20 outline-none"
            placeholder="Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <input
            type="email"
            className="w-full p-3 rounded-xl mb-3 bg-white/20 outline-none"
            placeholder="Email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <input
            type="tel"
            className="w-full p-3 rounded-xl mb-3 bg-white/20 outline-none"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          <select
            className="w-full p-3 rounded-xl mb-3 bg-white/10 border border-white/20 text-white outline-none"
            value={form.service_type}
            onChange={(e) => handleChange("service_type", e.target.value)}
          >
            <option className="bg-[#0f172a]" value="">Select Service</option>
            <option className="bg-[#0f172a]">Electronic Projects</option>
            <option className="bg-[#0f172a]">Notes Writing</option>
            <option className="bg-[#0f172a]">Record Writing</option>
            <option className="bg-[#0f172a]">PPT Creation</option>
            <option className="bg-[#0f172a]">Coding Projects</option>
            <option className="bg-[#0f172a]">Website Development</option>
            <option className="bg-[#0f172a]">Other</option>
          </select>

          {form.service_type === "Other" && (
            <input
              className="w-full p-3 rounded-xl mb-3 bg-white/20 outline-none"
              placeholder="Enter your service"
              value={form.custom_service}
              onChange={(e) =>
                handleChange("custom_service", e.target.value)
              }
            />
          )}

          <textarea
            className="w-full p-3 rounded-xl mb-3 bg-white/20 outline-none"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              handleChange("description", e.target.value)
            }
          />

          <input
            type="date"
            className="w-full p-3 rounded-xl mb-3 bg-white/20 outline-none"
            value={form.deadline}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) =>
              handleChange("deadline", e.target.value)
            }
          />

          <select
            className="w-full p-3 rounded-xl mb-3 bg-white/10 border border-white/20 text-white outline-none"
            value={form.priority}
            onChange={(e) =>
              handleChange("priority", e.target.value)
            }
          >
            <option className="bg-[#0f172a]">Normal</option>
            <option className="bg-[#0f172a]">Urgent</option>
          </select>

          <select
            className="w-full p-3 rounded-xl mb-3 bg-white/20 outline-none"
            value={form.payment_method}
            onChange={(e) =>
              handleChange("payment_method", e.target.value)
            }
          >
            <option>UPI</option>
            <option>COD</option>
          </select>

          <input
            type="file"
            className="mt-3"
            onChange={(e) => setFile(e.target.files?.[0])}
          />

          <button
            onClick={submit}
            disabled={loading}
            className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold hover:scale-105 transition"
          >
            {loading ? "Submitting..." : "Submit Task 🚀"}
          </button>

        </div>
      </div>

      <Footer />
    </div>
  );
}