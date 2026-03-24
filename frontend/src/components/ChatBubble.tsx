export default function ChatBubble({ msg }: any) {
  const isAdmin = msg.sender === "admin";

  return (
    <div className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-xs text-sm shadow relative
        ${isAdmin ? "bg-green-500 text-white" : "bg-white border"}`}
      >
        {msg.message}

        {/* ✅ TICKS */}
        {isAdmin && (
          <span className="absolute bottom-1 right-2 text-xs">
            {msg.seen ? "✔✔" : "✔"}
          </span>
        )}
      </div>
    </div>
  );
}