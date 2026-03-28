import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SubmitTask from "./pages/SubmitTask";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminChat from "./pages/AdminChat";
import Chat from "./pages/Chat";
import MyTasks from "./pages/MyTasks";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/submit" element={<SubmitTask />} />
         <Route path="/admin/chat" element={<AdminChat />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/my-tasks" element={<MyTasks />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}