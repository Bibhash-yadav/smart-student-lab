import { useState } from "react";
import ChatBubble from "./ChatBubble";

export default function ChatWindow({ messages, sendMessage, user }: any) {
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col flex-1">

      {/* HEADER */}
      <div className="p-4 border-b bg-white font-semibold">
        💬 {user?.name || "Select User"}
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
        {messages.map((msg: any, i: number) => (
          <ChatBubble key={i} msg={msg} />
        ))}
      </div>

      {/* INPUT */}
      <div className="flex p-3 bg-white border-t">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2"
          placeholder="Type message..."
        />

        <button
          onClick={() => {
            sendMessage(text);
            setText("");
          }}
          className="ml-2 bg-green-500 text-white px-4 rounded-lg"
        >
          Send
        </button>
      </div>

    </div>
  );
}