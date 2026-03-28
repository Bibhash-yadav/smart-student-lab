import { useState } from "react";

export default function ChatInput({ sendMessage }: any) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    sendMessage(text);
    setText("");
  };

  return (
    <div className="flex p-3 bg-white border-t">
      <input
        className="flex-1 border rounded-lg px-3 py-2"
        placeholder="Type message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleSend}
        className="ml-2 bg-green-600 text-white px-4 rounded-lg"
      >
        Send
      </button>
    </div>
  );
}