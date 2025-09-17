import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { MdDashboard, MdPeople, MdPostAdd } from "react-icons/md";
import { HiOutlineLogout, HiOutlineUser } from "react-icons/hi";

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Overview", icon: <MdDashboard size={24} /> },
    { to: "/users", label: "Users List", icon: <MdPeople size={24} /> },
    { to: "/posts", label: "Posts List", icon: <MdPostAdd size={24} /> },
  ];

  const isLargeScreen = window.innerWidth >= 1024;

  return (
    <aside
      onMouseEnter={() => isLargeScreen && setExpanded(true)}
      onMouseLeave={() => isLargeScreen && setExpanded(false)}
      className={`transition-all duration-300 rounded-md bg-white shadow-md 
        ${expanded ? "w-64" : "w-20"} flex flex-col p-4`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 rounded-full bg-yellow-400 overflow-hidden">
          <img src="/logo.jpg" alt="logo" className="w-full h-full object-cover" />
        </div>
        {expanded && <span className="font-semibold text-gray-800">Dashboard</span>}
      </div>

      {/* Links */}
      <nav className="flex flex-col gap-3">
        {links.map((link, index) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={index}
              to={link.to}
              className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? "text-yellow-500 font-semibold"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
            >
              {link.icon}
              {expanded && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="mt-auto pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col items-center gap-2">
        {user ? (
          <button
            onClick={logout}
            className="w-full px-2 py-2 rounded-md text-white bg-red-500 shadow-md font-semibold transition-transform hover:scale-105 flex items-center justify-center gap-2"
          >
            {expanded ? "Logout" : <HiOutlineLogout size={20} />}
          </button>
        ) : (
          <Link
            to="/login"
            className="w-full px-2 py-2 rounded-md text-white bg-teal-500 shadow-md font-semibold transition-transform hover:scale-105 flex items-center justify-center gap-2"
          >
            {expanded ? "Login" : <HiOutlineUser size={20} />}
          </Link>
        )}
      </div>
    </aside>
  );
}
