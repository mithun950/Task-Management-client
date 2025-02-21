// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, googleSignIn, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <h1 className="text-lg font-bold">Task Manager</h1>
      <Link to="/" className="text-white">
        Task List
      </Link>
      <Link to="/add-task" className="text-white">
        Add Task
      </Link>
      {user ? (
        <div className="flex items-center gap-4">
          <span>{user.displayName}</span>
          <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
        </div>
      ) : (
        <button onClick={googleSignIn} className="bg-blue-500 px-4 py-2 rounded">Login with Google</button>
      )}
    </nav>
  );
};

export default Navbar;
