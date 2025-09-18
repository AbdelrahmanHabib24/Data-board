import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiOutlineEye, HiOutlineEyeOff, HiUser, HiLockClosed, HiMail } from "react-icons/hi";
import { signupSchema } from "../utils/schemas";

export default function SignUp() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { username: "", email: "", password: "" },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    setServerError("");
    const res = await signup(values);
    if (res.ok) {
      navigate("/login"); 
    } else {
      setServerError(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-sm text-gray-500 mt-1">Join us! Please enter your details.</p>
        </header>

        {serverError && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 p-3 rounded">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
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
            {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <HiMail size={18} />
              </span>
              <input
                type="email"
                {...register("email")}
                className={`w-full pl-10 pr-3 py-3 rounded-xl border ${
                  errors.email ? "border-red-400" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-orange-400`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
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
                {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
          </div>

          {/* Already have account */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-600 hover:underline">
                Sign in
              </Link>
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full py-3 rounded-xl font-semibold transition 
              bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg 
              ${!isValid || isSubmitting ? "cursor-not-allowed opacity-60" : ""}`}
          >
            {isSubmitting ? "Creating..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}
