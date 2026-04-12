import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  CheckCircle,
  BarChart3,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import API from "../services/api";

export default function Home() {
  const navigate = useNavigate();

  const services = [
    { title: "Electronic Projects", desc: "Arduino, IoT systems", price: "₹500 – ₹2000" },
    { title: "Notes Writing", desc: "Handwritten / typed notes", price: "₹100 – ₹500" },
    { title: "Record Writing", desc: "Lab records & journals", price: "₹200 – ₹700" },
    { title: "PPT Creation", desc: "Professional presentations", price: "₹150 – ₹600" },
    { title: "Coding Projects", desc: "Python, Java, C++, C", price: "₹300 – ₹1500" },
    { title: "Website Development", desc: "Full-stack Website", price: "₹500 – ₹3000" },
  ];

  const features = [
    { text: "Fast Delivery", icon: <Zap size={30} />, action: () => navigate("/submit") },
    { text: "Secure Payment", icon: <Shield size={30} />, action: () => navigate("/submit") },
    { text: "Track Progress", icon: <BarChart3 size={30} />, action: () => navigate("/my-tasks") },
    { text: "Quality Work", icon: <CheckCircle size={30} />, action: () => navigate("/submit") },
  ];

  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  const sendContact = async () => {
    if (!contact.name || !contact.email || !contact.message) {
      alert("Please fill all fields ⚠️");
      return;
    }

    try {
      await API.post("/contact/", contact);
      alert("Message sent successfully 🚀");
      setContact({ name: "", email: "", message: "" });
    } catch {
      alert("Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-white bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#06b6d4]">

      <Navbar />

      {/* HERO */}
      <section className="w-full min-h-screen flex flex-col justify-center relative">
        <div className="px-6 md:px-16 lg:px-24 text-center">

         <div className="flex flex-col items-center gap-4 mb-10">

  {/* ICONS */}
  <div className="flex justify-center gap-6">
    {[Zap, Shield, BarChart3, CheckCircle].map((Icon, i) => (
      <div
        key={i}
        className="p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl"
      >
        <Icon className="text-cyan-300" size={32} />
      </div>
    ))}
  </div>

  {/* TEXT */}
  <p className="text-cyan-300 text-lg md:text-xl font-semibold tracking-wide">
    ⚡ Your academic task partner
  </p>

</div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-extrabold">
            Get Your Academic Tasks
          </motion.h1>

    <h2 className="text-5xl md:text-7xl font-extrabold mt-4 mb-6 leading-tight md:leading-[1.3] bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
  Done Right
</h2>

          <p className="mt-6 text-gray-300 max-w-xl mx-auto text-lg">
            Submit projects, notes, PPTs, coding assignments with fast delivery & secure payment..
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link to="/submit" className="bg-cyan-400 text-black px-6 py-3 rounded-xl font-semibold">
              Submit Task 👉
            </Link>
            <a href="#services" className="border border-white px-6 py-3 rounded-xl">
              Explore
            </a>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="w-full py-16">
        <div className="px-6 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-4 gap-6">

          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              onClick={f.action}
              className="bg-white/10 p-6 rounded-xl text-center cursor-pointer"
            >
              <div className="mb-4 flex justify-center text-cyan-300">{f.icon}</div>
              <p className="font-semibold">{f.text}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="w-full py-20">
        <div className="px-6 md:px-16 lg:px-24">

          <h2 className="text-4xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-center text-gray-300 mb-12">Premium academic solutions</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {services.map((s, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }}>
                <ServiceCard {...s} />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* CONTACT */}
      <section className="w-full py-24 relative">
        <div className="px-6 md:px-16 lg:px-24">

          <h2 className="text-4xl font-bold text-center mb-4">
           📞 Contact Us
          </h2>
<h2 className="text-2xl  text-center mb-12">
           Have questions? We’re always here to help 💬
          </h2>
          <div className="grid md:grid-cols-2 gap-10">

            {/* LEFT */}
            <div className="p-8 rounded-2xl bg-white/10">
              <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
              <p className="text-gray-300 mb-6">Let’s build something amazing 🚀</p>

              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-xl">📧 studentstore142@gmail.com</div>
                <div className="p-4 bg-white/10 rounded-xl">📱 +91 XXXXXXXX</div>
                <div className="p-4 bg-white/10 rounded-xl">📍 India</div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="p-8 rounded-2xl bg-white/10">

              <h3 className="text-2xl font-bold mb-6">Send Message</h3>

              <input
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                className="w-full p-3 rounded-xl mb-4 bg-white/20"
                placeholder="Your Name"
              />

              <input
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="w-full p-3 rounded-xl mb-4 bg-white/20"
                placeholder="Your Email"
              />

              <textarea
                value={contact.message}
                onChange={(e) => setContact({ ...contact, message: e.target.value })}
                className="w-full p-3 rounded-xl mb-4 bg-white/20"
                rows={5}
                placeholder="Your Message"
              />

              <button
                onClick={sendContact}
                className="w-full py-3 rounded-xl bg-cyan-400 text-black font-semibold"
              >
                Send Message 🚀
              </button>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}