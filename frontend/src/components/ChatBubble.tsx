export default function ChatBubble({ msg }: any) {
  const isUser = msg.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-xl max-w-[70%] text-sm shadow ${
          isUser
            ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black"
            : "bg-white/10 text-white border border-white/10"
        }`}
      >
        {msg.message}
      </div>
    </div>
  );
}