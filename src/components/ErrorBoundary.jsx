// src/components/ErrorBoundary.jsx
import React from "react";

export default class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 rounded-md bg-red-50 text-red-700">
          <h2 className="font-semibold text-lg">Something went wrong</h2>
          <p className="text-sm">{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
