import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiUser,
  HiLockClosed,
} from "react-icons/hi";
import { loginSchema } from "../utils/schemas";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    setServerError("");
    try {
      const res = await login(values);
      if (res.ok) {
        navigate("/");
      } else {
        const msg = res.message;
        setServerError(msg);
        setError("password", { type: "server", message: msg });
      }
    } catch {
      setServerError("Unexpected error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500 animate-fadeIn">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
            Sign in
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back! Please enter your details.
          </p>
        </header>

        {serverError && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 p-3 rounded">
            {serverError}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <HiUser size={18} />
              </span>
              <input
                type="text"
                {...register("username")}
                className={`w-full pl-10 pr-3 py-3 rounded-xl border ${
                  errors.username ? "border-red-400" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-orange-400`}
                placeholder="your.username"
              />
            </div>
            {errors.username && (
              <p className="mt-1 text-xs text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <HiLockClosed size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`w-full pl-10 pr-10 py-3 rounded-xl border ${
                  errors.password ? "border-red-400" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-orange-400`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <HiOutlineEyeOff size={20} />
                ) : (
                  <HiOutlineEye size={20} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-400"
              />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a className="text-orange-600 hover:underline" href="#">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full py-3 rounded-xl font-semibold transition 
    bg-gradient-to-r from-orange-600 to-amber-500 
    hover:from-orange-700 hover:to-amber-600 text-white shadow-lg
    ${!isValid || isSubmitting ? "cursor-not-allowed opacity-60" : ""}`}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
