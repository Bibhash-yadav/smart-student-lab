import { useState } from "react";

export default function ChatInput({ sendMessage }: any) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
  };

  return (
    <div className="flex gap-2 p-3 border-t bg-white">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
        className="flex-1 border rounded-lg px-3 py-2"
      />

      <button
        onClick={handleSend}
        className="bg-green-500 text-white px-4 rounded-lg"
      >
        Send
      </button>
    </div>
  );
}