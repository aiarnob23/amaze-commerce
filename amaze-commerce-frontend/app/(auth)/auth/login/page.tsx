"use client";

import { useAuth } from "@/app/provider/AuthProvider";
import SuspenseWrapper from "@/components/SuspenseWrapper";
import { loginUser } from "@/lib/user";
import { successAlert } from "@/lib/utils/sweetAlerts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, User } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);

    try {
      const res: any = await loginUser(email, password);
      if (res?.data?.success) {
        successAlert("Login is successful");
        login(res?.data?.data?.result, res?.data?.data?.accessToken);
        setTimeout(() => {
          const redirectTo = "/";
          router.push(redirectTo);
        }, 600);
      } else {
        setLoginError(res?.data?.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setLoginError("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SuspenseWrapper>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/30 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <Link href="/main">
              <h1 className="text-4xl font-bold mb-2 cursor-pointer hover:scale-105 transition-transform duration-200">
                Amaze<span className="text-gradient">Com</span>
              </h1>
            </Link>
            <p className="text-gray-600">Welcome back! Sign in to continue</p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-8 text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Sign In</h2>
              <p className="text-indigo-100">
                Access your account to continue shopping
              </p>
            </div>

            {/* Form Section */}
            <div className="p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200"
                      placeholder="Enter your password"
                      required
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff size={18} className="text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye size={18} className="text-gray-400 hover:text-gray-600" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {loginError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm font-medium">{loginError}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !email || !password}
                  className="w-full button-gradient flex items-center justify-center space-x-2 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">New to AmazeCom?</span>
                  </div>
                </div>
              </div>

              {/* Register Link */}
              <Link
                href="/auth/register"
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 border-2 border-gray-200 rounded-xl text-gray-700 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200 font-medium"
              >
                <span>Create your AmazeCom account</span>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </SuspenseWrapper>
  );
}