import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Contexts
import { AuthProvider, AuthContext } from "./contexts/AuthContext.jsx";
import { UsersProvider } from "./contexts/UsersContext.jsx";
import { PostsProvider } from "./contexts/PostsContext.jsx";

// Pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import UsersList from "./pages/UsersList.jsx";
import PostsList from "./pages/PostsList.jsx";

function RequireAuth({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <AuthProvider>
      <UsersProvider>
        <PostsProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/users"
              element={
                <RequireAuth>
                  <UsersList />
                </RequireAuth>
              }
            />
            <Route
              path="/posts"
              element={
                <RequireAuth>
                  <PostsList />
                </RequireAuth>
              }
            />
          </Routes>
        </PostsProvider>
      </UsersProvider>
    </AuthProvider>
  );
}
