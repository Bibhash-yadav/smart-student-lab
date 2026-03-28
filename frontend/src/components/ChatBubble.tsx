export default function ChatBubble({ msg }: any) {
  const isUser = msg.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`px-4 py-2 rounded-lg max-w-xs ${
        isUser
          ? "bg-green-500 text-white"
          : "bg-white border"
      }`}>
        {msg.message}

        {isUser && (
          <div className="text-xs mt-1 text-right">
            {msg.seen ? "✔✔" : "✔"}
          </div>
        )}
      </div>
    </div>
  );
}