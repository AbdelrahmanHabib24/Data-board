import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";
import Loading from "./components/Loading";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <App />
        </React.Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
