// src/components/ErrorBoundary.jsx
import React from "react";

export default class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
    this.setState({ errorInfo: info });
  }

 

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 rounded-md bg-red-50 text-red-700 border border-red-200">
          <h2 className="font-semibold text-lg mb-2">
            ⚠️ Something went wrong
          </h2>

          {/* Error message */}
          <p className="text-sm mb-2">
            <strong>Error:</strong> {this.state.error?.message}
          </p>

          {/* Stack trace */}
          {this.state.errorInfo && (
            <pre className="text-xs bg-white text-red-600 p-3 rounded-md overflow-auto max-h-64">
              {this.state.error?.stack}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
