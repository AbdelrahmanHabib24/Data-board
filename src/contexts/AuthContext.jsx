/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // load 
  useEffect(() => {
    const token = localStorage.getItem("mini-dashboard-token");
    const storedUser = localStorage.getItem("mini-dashboard-user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

const login = ({ username, password }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (password !== "1234") {
        resolve({ ok: false, message: "Invalid credentials" });
      } else {
        const fakeToken = `fake-jwt-${Date.now()}`;
        const u = { id: 1, username };

        localStorage.setItem("mini-dashboard-token", fakeToken);
        localStorage.setItem("mini-dashboard-user", JSON.stringify(u));
        setUser(u);

        resolve({ ok: true });
      }
    }, 1000); 
  });
};


  const logout = () => {
    localStorage.removeItem("mini-dashboard-token");
    localStorage.removeItem("mini-dashboard-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
