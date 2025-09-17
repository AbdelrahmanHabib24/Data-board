// src/components/Header.jsx
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Button from "./Button";

export default function Header({ type = "users", onNew, onSearch, searchValue = "", children }) {
  const { user } = useContext(AuthContext);

  const newLabel = type === "users" ? "New User" : "New Post";
  const placeholder = type === "users" ? "Search users..." : "Search posts...";

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 p-4  border-gray-200 bg-white ">
      {user && (
        <span className="text-sm text-gray-700">
          Welcome, <span className="font-semibold text-yellow-500">{user.username} 👋</span>
        </span>
      )}

      <div className="flex-1 text-left sm:text-center min-w-[150px]">{children}</div>

      {onSearch && (
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={placeholder}
          className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                     focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      )}

      {onNew && <Button onClick={onNew}>{newLabel}</Button>}
    </header>
  );
}
