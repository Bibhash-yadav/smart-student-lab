import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Home, Layers, MessageCircle } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const getInitial = () => {
    if (!user) return "";
    return user.name
      ? user.name.charAt(0).toUpperCase()
      : user.email?.charAt(0).toUpperCase();
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const goHome = () => {
    if (location.pathname !== "/") navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToServices = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById("services")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 200);
    } else {
      document.getElementById("services")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const goToChat = () => navigate("/chat");
  const goToCourses = () => navigate("/courses");

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-[#0f172a]/90 via-[#1e1b4b]/90 to-[#06b6d4]/90 border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">

      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">

        {/* LOGO */}
        <h1
          onClick={goHome}
          className="font-bold text-lg md:text-xl flex items-center gap-2 cursor-pointer"
        >
          🎓
          <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent font-extrabold">
            Student Store
          </span>
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-white">

          <button
            onClick={goHome}
            className="flex items-center gap-2 hover:text-cyan-300 transition hover:scale-110"
          >
            <Home
              size={20}
              className="drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
            />
            Home
          </button>

          <button
            onClick={goToServices}
            className="flex items-center gap-2 hover:text-cyan-300 transition hover:scale-110"
          >
            <Layers
              size={20}
              className="drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
            />
            Services
          </button>
          <button
  onClick={goToCourses}
  className="flex items-center gap-2 hover:text-cyan-300 transition hover:scale-110"
>
  📄 Courses
</button>

          <button
            onClick={goToChat}
            className="flex items-center gap-2 hover:text-cyan-300 transition hover:scale-110"
          >
            <MessageCircle
              size={20}
              className="drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
            />
            Chat
          </button>

          {user ? (
            <div className="flex items-center gap-3">

              {/* 3D AVATAR */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-black flex items-center justify-center font-bold shadow-[0_0_20px_rgba(34,211,238,0.9)] hover:scale-110 transition">
                {getInitial()}
              </div>

              <button
                onClick={logout}
                className="text-sm text-red-400 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-5 py-2 rounded-xl font-semibold shadow-[0_0_15px_rgba(34,211,238,0.8)] hover:scale-105 transition"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 bg-black/90 backdrop-blur-xl border-t border-white/10 text-white">

          <button onClick={() => { setMenuOpen(false); goHome(); }}>
            Home
          </button>

          <button onClick={() => { setMenuOpen(false); goToServices(); }}>
            Services
          </button>

          <button onClick={() => { setMenuOpen(false); goToChat(); }}>
            Chat
          </button>

          {user ? (
            <div className="flex items-center gap-3 mt-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-black flex items-center justify-center font-bold">
                {getInitial()}
              </div>

              <button onClick={logout} className="text-red-400">
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-cyan-400 text-black px-4 py-2 rounded-xl text-center"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </div>
  );
}