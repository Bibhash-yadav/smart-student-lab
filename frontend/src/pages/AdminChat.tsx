import { useEffect, useState } from "react";
import API from "../services/api";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";

export default function AdminChat() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);

  // 🔥 FETCH USERS
 const fetchUsers = async () => {
  const res = await API.get("/chat/users");
  setUsers(res.data);
};

  // 🔥 FETCH MESSAGES
  const fetchMessages = async (userId: string) => {
    const res = await API.get(`/chat/${userId}`);
    setMessages(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser.id);
    }
  }, [selectedUser]);

  // 🔥 SEND MESSAGE
  const sendMessage = async (text: string) => {
    if (!text) return;

    await API.post("/chat/", {
      message: text,
      sender: "admin",
      user_id: selectedUser.id
    });

    fetchMessages(selectedUser.id);
  };

  return (
    <div className="flex h-screen">

      {/* LEFT USERS */}
      <ChatList
        users={users}
        selectUser={setSelectedUser}
        selected={selectedUser}
      />

      {/* RIGHT CHAT */}
      <ChatWindow
        messages={messages}
        sendMessage={sendMessage}
        user={selectedUser}
      />

    </div>
  );
}