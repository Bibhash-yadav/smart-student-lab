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
    // 🔥 Navigate with service data
    navigate("/submit", {
      state: { service: title }
    });
  };

  return (
    <div className="group relative bg-white/80 backdrop-blur-xl border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-2 overflow-hidden">

      {/* 🔥 GLOW EFFECT */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-blue-100 via-transparent to-blue-100 blur-xl"></div>

      {/* ICON */}
      <div className="relative text-4xl mb-4 group-hover:scale-110 transition">
        {getIcon(title)}
      </div>

      {/* TITLE */}
      <h2 className="relative text-lg font-semibold text-gray-800">
        {title}
      </h2>

      {/* DESCRIPTION */}
      <p className="relative text-gray-500 mt-2 text-sm leading-relaxed">
        {desc}
      </p>

      {/* FOOTER */}
      <div className="relative flex justify-between items-center mt-6">
        <span className="font-bold text-blue-600 text-sm">
          {price}
        </span>

        <button
          onClick={handleOrder}
          className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-md hover:shadow-lg active:scale-95"
        >
          Order 🚀
        </button>
      </div>

    </div>
  );
}