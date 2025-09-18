/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // saved session
  useEffect(() => {
    const token = localStorage.getItem("mini-dashboard-token");
    const storedUser = localStorage.getItem("mini-dashboard-user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);


  // signup 
  const signup = async ({ username, password }) => {
    await new Promise((r) => setTimeout(r, 300));

    const users = JSON.parse(localStorage.getItem("mini-dashboard-users") || "[]");

    // duplicate username
    if (users.find((u) => u.username === username)) {
      return { ok: false, message: "Username already exists" };
    }

    const newUser = { id: Date.now(), username, password };
    users.push(newUser);
    localStorage.setItem("mini-dashboard-users", JSON.stringify(users));

    // create fake session
    const token = `fake-jwt-${Date.now()}`;
    const safeUser = { id: newUser.id, username: newUser.username };
    localStorage.setItem("mini-dashboard-token", token);
    localStorage.setItem("mini-dashboard-user", JSON.stringify(safeUser));
    setUser(safeUser);

    return { ok: true };
  };

  // login 
  const login = async ({ username, password }) => {
    await new Promise((r) => setTimeout(r, 300));

    const users = JSON.parse(localStorage.getItem("mini-dashboard-users") || "[]");
    const found = users.find((u) => u.username === username);

    if (!found) {
  // username doesn't exist 
      return { ok: false, message: "Username not found. Please sign up." };
    }
   // Password is incorrect
    if (found.password !== password) {
      return { ok: false, message: "Password is incorrect" };
    }

    const token = `fake-jwt-${Date.now()}`;
    const safeUser = { id: found.id, username: found.username };
    localStorage.setItem("mini-dashboard-token", token);
    localStorage.setItem("mini-dashboard-user", JSON.stringify(safeUser));
    setUser(safeUser);

    return { ok: true };
  };
// logout
  const logout = () => {
    localStorage.removeItem("mini-dashboard-token");
    localStorage.removeItem("mini-dashboard-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout , loading }}>
      {children}
    </AuthContext.Provider>
  );
}
