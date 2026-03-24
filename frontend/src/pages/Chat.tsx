import { useEffect, useState } from "react";
import API from "../services/api";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";

export default function Chat() {
    const [messages, setMessages] = useState<any[]>([]);
    const [userId, setUserId] = useState<string>("");

    // ✅ GET USER FROM LOGIN
    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            const user = JSON.parse(storedUser);

            console.log("REAL USER:", user); // 🔥 DEBUG

            if (user?.id) {
                setUserId(String(user.id));   // ✅ FORCE STRING MATCH
            }
        }
    }, []);

    // ✅ FETCH MESSAGES
    const fetchMessages = async (id: string) => {
        if (!id) return;

        try {
            const res = await API.get(`/chat/${id}`);
            setMessages(res.data);
        } catch (err) {
            console.log("Fetch error:", err);
        }
    };

    // ✅ AUTO REFRESH
    useEffect(() => {
        if (!userId) return;

        fetchMessages(userId);

        const interval = setInterval(() => {
            fetchMessages(userId);
        }, 2000);

        return () => clearInterval(interval);
    }, [userId]);

    // ✅ SEND MESSAGE
    const sendMessage = async (text: string) => {
        if (!text || !userId) return;

        try {
            await API.post("/chat/", {
                message: text,
                sender: "user",
                user_id: userId
            });

            fetchMessages(userId);
        } catch (err) {
            console.log("Send error:", err);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">

            {/* HEADER */}
            <div className="p-4 bg-green-600 text-white font-bold shadow">
                💬 Chat Support
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.length === 0 ? (
                    <p className="text-center text-gray-500 mt-10">
                        No messages yet 👀
                    </p>
                ) : (
                    messages.map((msg, i) => (
                        <ChatBubble key={i} msg={msg} />
                    ))
                )}
            </div>

            {/* INPUT */}
            <ChatInput sendMessage={sendMessage} />

        </div>
    );
}