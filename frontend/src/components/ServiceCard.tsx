import { useNavigate } from "react-router-dom";

const getIcon = (title: string) => {
  switch (title) {
    case "Electronic Projects":
      return "⚙️";
    case "Notes Writing":
      return "📝";
    case "Record Writing":
      return "📚";
    case "PPT Creation":
      return "📊";
    case "Coding Projects":
      return "💻";
    case "Website Development":
      return "🌐";
    default:
      return "✨";
  }
};

export default function ServiceCard({ title, desc, price }: any) {
  const navigate = useNavigate();

  const handleOrder = () => {
    navigate("/submit", {
      state: { service: title }
    });
  };

  return (
    <div className="group relative bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.7)] transition duration-300 hover:-translate-y-3 hover:scale-[1.03] overflow-hidden text-white">

      {/* 3D GLOW */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-cyan-400/20 via-transparent to-purple-400/20 blur-2xl"></div>

      {/* ICON */}
      <div className="relative text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition duration-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
        {getIcon(title)}
      </div>

      {/* TITLE */}
      <h2 className="relative text-xl font-semibold text-cyan-300">
        {title}
      </h2>

      {/* DESCRIPTION */}
      <p className="relative text-gray-300 mt-2 text-sm leading-relaxed">
        {desc}
      </p>

      {/* FOOTER */}
      <div className="relative flex justify-between items-center mt-6">

        <span className="font-bold text-cyan-400 text-sm">
          {price}
        </span>

        <button
          onClick={handleOrder}
          className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold shadow-[0_0_15px_rgba(34,211,238,0.7)] hover:scale-105 transition active:scale-95"
        >
          Order 🚀
        </button>

      </div>

    </div>
  );
}