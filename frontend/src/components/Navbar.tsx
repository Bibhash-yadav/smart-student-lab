import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 LOAD USER FROM LOCALSTORAGE
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔥 GET FIRST LETTER (AVATAR)
  const getInitial = () => {
    if (!user) return "";
    return user.name
      ? user.name.charAt(0).toUpperCase()
      : user.email?.charAt(0).toUpperCase();
  };

  // 🔥 LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // 🔥 HOME
  const goHome = () => {
    if (location.pathname !== "/") navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🔥 SERVICES
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

  // 🔥 CHAT
  const goToChat = () => {
    navigate("/chat");
  };

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">

        {/* LOGO */}
        <h1
          onClick={goHome}
          className="font-bold text-lg md:text-xl flex items-center gap-2 cursor-pointer"
        >
          🎓 <span>Student Store</span>
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">

          <button onClick={goHome} className="hover:text-blue-600 transition">
            Home
          </button>

          <button onClick={goToServices} className="hover:text-blue-600 transition">
            Services
          </button>

          <button
            onClick={goToChat}
            className="flex items-center gap-1 hover:text-green-600 transition"
          >
            Chat
          </button>

          {/* 🔥 USER OR LOGIN */}
          {user ? (
            <div className="flex items-center gap-3">

              {/* AVATAR */}
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {getInitial()}
              </div>

              {/* LOGOUT */}
              <button
                onClick={logout}
                className="text-sm text-red-500 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 bg-white border-t">

          <button
            onClick={() => {
              setMenuOpen(false);
              goHome();
            }}
            className="text-left"
          >
            Home
          </button>

          <button
            onClick={() => {
              setMenuOpen(false);
              goToServices();
            }}
            className="text-left"
          >
            Services
          </button>

          <button
            onClick={() => {
              setMenuOpen(false);
              goToChat();
            }}
            className="text-left"
          >
            Chat
          </button>

          {/* 🔥 MOBILE USER */}
          {user ? (
            <div className="flex items-center gap-3 mt-2">

              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {getInitial()}
              </div>

              <button
                onClick={logout}
                className="text-red-500"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </div>
  );
}