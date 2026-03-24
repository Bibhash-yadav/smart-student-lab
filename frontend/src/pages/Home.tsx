import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function Home() {
  const services = [
    { title: "Electronic Projects", desc: "Arduino, IoT systems", price: "₹500 – ₹2000" },
    { title: "Notes Writing", desc: "Handwritten / typed notes", price: "₹100 – ₹500" },
    { title: "Record Writing", desc: "Lab records & journals", price: "₹200 – ₹700" },
    { title: "PPT Creation", desc: "Professional presentations", price: "₹150 – ₹600" },
    { title: "Coding Projects", desc: "Python, Java, C++", price: "₹300 – ₹1500" },
    { title: "Website Development", desc: "Full-stack apps", price: "₹500 – ₹3000" },
  ];

  // 🔥 CONTACT STATE
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: ""
  });

  // 🔥 SEND CONTACT
  const sendContact = async () => {
    if (!contact.name || !contact.email || !contact.message) {
      alert("Please fill all fields ⚠️");
      return;
    }

    try {
      await API.post("/contact/", contact);
      alert("Message sent successfully 🚀");

      setContact({
        name: "",
        email: "",
        message: ""
      });

    } catch (err) {
      console.log(err);
      alert("Failed to send message ❌");
    }
  };

  return (
    <div className="bg-gray-50">
      <Navbar />

      {/* HERO */}
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-gradient-to-br from-blue-50 to-white">
        <p className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm mb-4">
          ⚡ Your academic task partner
        </p>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          Get Your Academic Tasks
        </h1>

        <h2 className="text-blue-600 text-4xl md:text-6xl font-bold mt-2">
          Done Right
        </h2>

        <p className="mt-6 text-gray-500 max-w-xl">
          Submit projects, notes, PPTs, coding assignments with fast delivery & secure payment.
        </p>

        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          <Link
            to="/submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
          >
            Submit Task →
          </Link>

          <a
            href="#services"
            className="border px-6 py-3 rounded-lg hover:bg-gray-100"
          >
            View Services
          </a>
        </div>
      </div>

      {/* FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 -mt-16 mb-10">
        {["⚡ Fast Delivery", "🔒 Secure Payment", "📊 Track Progress", "✅ Quality Work"].map((f, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow text-center">
            {f}
          </div>
        ))}
      </div>

      {/* SERVICES */}
      <div id="services" className="px-6 py-20 bg-gradient-to-b from-white to-gray-50">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          🚀 Our Premium Services
        </h2>

        <p className="text-center text-gray-500 mb-10">
          Choose from high-quality academic & technical solutions
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((s, i) => (
            <ServiceCard key={i} {...s} />
          ))}
        </div>
      </div>

      {/* CONTACT */}
      <div className="px-6 py-20 bg-gradient-to-br from-blue-50 to-white">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          📞 Contact Us
        </h2>

        <p className="text-center text-gray-500 mb-12">
          Have questions? We’re always here to help 💬
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">

          {/* LEFT */}
          <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
            <div className="flex gap-4"><span>📧</span><div><p>Email</p><p className="text-gray-500">smartstudentlab@gmail.com</p></div></div>
            <div className="flex gap-4"><span>📱</span><div><p>Phone</p><p className="text-gray-500">+91 98765 43210</p></div></div>
            <div className="flex gap-4"><span>📸</span><div><p>Instagram</p><p className="text-gray-500">@smartstudentlab</p></div></div>
            <div className="flex gap-4"><span>📍</span><div><p>Location</p><p className="text-gray-500">India</p></div></div>
          </div>

          {/* FORM */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">✉️ Send Message</h3>

            <input
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              className="input"
              placeholder="👤 Your Name"
            />

            <input
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              className="input"
              placeholder="📧 Your Email"
            />

            <textarea
              value={contact.message}
              onChange={(e) => setContact({ ...contact, message: e.target.value })}
              className="input"
              placeholder="💬 Your Message"
            />

            <button
              onClick={sendContact}
              className="w-full bg-blue-600 text-white py-3 mt-4 rounded-xl hover:bg-blue-700"
            >
              Send Message 🚀
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}