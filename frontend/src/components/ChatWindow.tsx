import { useState, useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";

export default function ChatWindow({ messages, sendMessage, user }: any) {
  const [text, setText] = useState("");

  const containerRef = useRef<any>(null);
  const bottomRef = useRef<any>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // 🔥 SMART AUTO SCROLL
  useEffect(() => {
    if (autoScroll) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, autoScroll]);

  // 🔥 DETECT USER SCROLL
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const isNearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 100;

    setAutoScroll(isNearBottom);
  };

  return (
    <div className="flex flex-col flex-1 w-full h-full bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#06b6d4] text-white">

      {/* HEADER */}
      <div className="p-4 backdrop-blur-xl bg-white/10 border-b border-white/10 font-semibold">
        💬 {user?.name || "Chat"}
      </div>

      {/* MESSAGES */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-3 relative"
      >
        {/* glow */}
        <div className="absolute w-[250px] h-[250px] bg-cyan-400/20 blur-3xl rounded-full top-0 left-0"></div>
        <div className="absolute w-[250px] h-[250px] bg-purple-500/20 blur-3xl rounded-full bottom-0 right-0"></div>

        {messages.map((msg: any, i: number) => (
          <ChatBubble key={i} msg={msg} />
        ))}

        {/* 🔥 scroll target */}
        <div ref={bottomRef}></div>
      </div>

      {/* INPUT */}
      <div className="flex p-3 backdrop-blur-xl bg-white/10 border-t border-white/10">

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Type message..."
        />

        <button
          onClick={() => {
            if (!text) return;
            sendMessage(text);
            setText("");
            setAutoScroll(true); // 🔥 force scroll on send
          }}
          className="ml-3 px-5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold hover:scale-105 transition"
        >
          Send
        </button>

      </div>

    </div>
  );
}