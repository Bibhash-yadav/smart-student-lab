import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [userId, setUserId] = useState<string>("");

  const bottomRef = useRef<any>(null);
  const containerRef = useRef<any>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const navigate = useNavigate();

  // 🔥 LOGIN CHECK
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first ❌");
      navigate("/login");
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user?.id) setUserId(String(user.id));
    }
  }, []);

  const fetchMessages = async (id: string) => {
    if (!id) return;
    try {
      const res = await API.get(`/chat/${id}`);
      setMessages(res.data);
    } catch {}
  };

  useEffect(() => {
    if (!userId) return;

    fetchMessages(userId);

    const interval = setInterval(() => {
      fetchMessages(userId);
    }, 2000);

    return () => clearInterval(interval);
  }, [userId]);

  useEffect(() => {
    if (autoScroll) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const isNearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 100;

    setAutoScroll(isNearBottom);
  };

  const sendMessage = async (text: string) => {
    if (!text || !userId) return;

    try {
      await API.post("/chat/", {
        message: text,
        sender: "user",
        user_id: userId,
      });

      setAutoScroll(true);
      fetchMessages(userId);
    } catch {}
  };

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#06b6d4] text-white">

      <div className="px-6 py-4 backdrop-blur-xl bg-white/10 border-b border-white/10">
        💬 Chat Support
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3 relative overflow-x-hidden"
      >
        <div className="pointer-events-none absolute w-[250px] h-[250px] bg-cyan-400/20 blur-3xl rounded-full top-0 left-0"></div>
        <div className="pointer-events-none absolute w-[250px] h-[250px] bg-purple-500/20 blur-3xl rounded-full bottom-0 right-0"></div>

        {messages.map((msg, i) => (
          <ChatBubble key={i} msg={msg} />
        ))}

        <div ref={bottomRef}></div>
      </div>

      <div className="px-4 py-3 backdrop-blur-xl bg-white/10 border-t border-white/10 text-green-900 font-bold rounded-t-2xl">
        <ChatInput sendMessage={sendMessage} />
      </div>

    </div>
  );
}