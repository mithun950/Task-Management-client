import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const { user, googleSignIn, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navLinks = [
    { name: "Task List", path: "/" },
    { name: "Add Task", path: "/add-task" },
  ];

  return (
    <nav className="bg-gray-900 text-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Manager</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-md transition-all ${
                location.pathname === link.path
                  ? "bg-white text-black"
                  : "hover:text-blue-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* User Authentication */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <span className="font-semibold">{user.displayName}</span>
              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={googleSignIn}
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
            >
              Login with Google
            </button>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <button className="md:hidden z-50" onClick={toggleMenu}>
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-0 right-0 w-64  bg-gray-800 shadow-lg">
          <div className="px-6 py-4 relative">
            <div className="mt-12 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-2 text-lg ${
                    location.pathname === link.path
                      ? "text-blue-400"
                      : "text-white"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="w-full bg-red-500 py-2 rounded-lg text-white"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    googleSignIn();
                    setMenuOpen(false);
                  }}
                  className="w-full bg-blue-500 py-2 rounded-lg text-white"
                >
                  Login with Google
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
