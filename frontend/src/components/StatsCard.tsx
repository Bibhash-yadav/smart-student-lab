type Props = {
  title: string;
  value: string | number;
  color?: string;
  icon?: string;
};

export default function StatsCard({ title, value, color, icon }: Props) {
  return (
    <div
      className={`relative p-5 rounded-2xl shadow-md text-white overflow-hidden 
      ${color || "bg-gradient-to-r from-blue-500 to-blue-700"} 
      hover:shadow-2xl hover:-translate-y-1 transition duration-300`}
    >

      {/* 🔥 Glow Effect */}
      <div className="absolute inset-0 opacity-20 bg-white blur-xl"></div>

      {/* CONTENT */}
      <div className="relative flex justify-between items-center">

        {/* TEXT */}
        <div>
          <h2 className="text-sm opacity-80">{title}</h2>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>

        {/* ICON */}
        {icon && (
          <div className="text-3xl opacity-80">
            {icon}
          </div>
        )}

      </div>

    </div>
  );
}