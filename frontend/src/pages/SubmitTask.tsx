import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SubmitTask() {
  const [form, setForm] = useState<any>({
    name: "",
    email: "",
    phone: "",
    service_type: "",
    custom_service: "", // 🔥 NEW FIELD
    description: "",
    deadline: "",
    priority: "Normal",
    payment_method: "UPI"
  });

  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const submit = async () => {
    // 🔥 VALIDATION
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

    // ✅ Use custom service if "Other" selected
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

      const res = await API.post("/tasks/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("SUCCESS:", res.data);
      alert("✅ Task Submitted Successfully 🚀");

      // 🔄 RESET FORM
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

    } catch (err: any) {
      console.log("FULL ERROR:", err);
      console.log("BACKEND ERROR:", err.response?.data);

      alert(
        err.response?.data?.detail ||
        "❌ Error submitting task"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-10">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">

          <h1 className="text-2xl font-bold text-center mb-6">
            🚀 Submit Your Task
          </h1>

          {/* NAME */}
          <input
            className="input"
            placeholder="👤 Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          {/* EMAIL */}
          <input
            type="email"
            className="input"
            placeholder="📧 Email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          {/* PHONE */}
          <input
            type="tel"
            className="input"
            placeholder="📱 Phone"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          {/* SERVICE TYPE */}
          <select
            className="input"
            value={form.service_type}
            onChange={(e) => handleChange("service_type", e.target.value)}
          >
            <option value="">📌 Select Service</option>
            <option value="Electronic Projects">🔌 Electronic Projects</option>
            <option value="Notes Writing">📝 Notes Writing</option>
            <option value="Record Writing">📚 Record Writing</option>
            <option value="PPT Creation">📊 PPT Creation</option>
            <option value="Coding Projects">💻 Coding Projects</option>
            <option value="Website Development">🌐 Website Development</option>
            <option value="Other">✏️ Other</option>
          </select>

          {/* 🔥 SHOW INPUT IF OTHER SELECTED */}
          {form.service_type === "Other" && (
            <input
              className="input"
              placeholder="✏️ Enter your service"
              value={form.custom_service}
              onChange={(e) => handleChange("custom_service", e.target.value)}
            />
          )}

          {/* DESCRIPTION */}
          <textarea
            className="input"
            placeholder="📝 Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          {/* DEADLINE */}
          <input
            type="date"
            className="input"
            value={form.deadline}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => handleChange("deadline", e.target.value)}
          />

          {/* PRIORITY */}
          <select
            className="input"
            value={form.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
          >
            <option value="Normal">Normal</option>
            <option value="Urgent">Urgent ⚡</option>
          </select>

          {/* PAYMENT */}
          <select
            className="input"
            value={form.payment_method}
            onChange={(e) => handleChange("payment_method", e.target.value)}
          >
            <option value="UPI">UPI</option>
            <option value="COD">Cash on Delivery</option>
          </select>

          {/* FILE */}
          <input
            type="file"
            className="mt-3"
            onChange={(e) => setFile(e.target.files?.[0])}
          />

          {/* SUBMIT */}
          <button
            onClick={submit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 mt-5 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Submitting..." : "Submit Task 🚀"}
          </button>

        </div>
      </div>

      <Footer />
    </>
  );
}