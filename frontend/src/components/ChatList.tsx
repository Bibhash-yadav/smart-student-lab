export default function ChatList({ users, selectUser, selected }: any) {
  return (
    <div className="w-1/3 border-r bg-white overflow-y-auto">
      {users.map((u: any) => (
        <div
          key={u.id}
          onClick={() => selectUser(u)}
          className={`p-4 cursor-pointer border-b hover:bg-gray-100 ${
            selected?.id === u.id ? "bg-gray-200" : ""
          }`}
        >
          <h2 className="font-semibold">👤 {u.name}</h2>

          <p className="text-sm text-gray-500 truncate">
            {u.lastMessage || "Tap to chat"}
          </p>
        </div>
      ))}
    </div>
  );
}