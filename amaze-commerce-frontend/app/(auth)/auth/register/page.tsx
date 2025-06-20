"use client";

import { registerUser } from "@/lib/user";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Password validation states
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    symbol: false
  });

  const validatePassword = (pass: string) => {
    setPasswordValidation({
      length: pass.length >= 6,
      uppercase: /[A-Z]/.test(pass),
      symbol: /[\W_]/.test(pass)
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleRegisterUser = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validation checks
    if (!name || !email || !phone || !password) {
      setError("All fields must be filled out");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters long!");
      setIsLoading(false);
      return;
    }

    const hasUppercase = /[A-Z]/.test(password);
    const hasSymbol = /[\W_]/.test(password);

    if (!hasUppercase) {
      setError("Password must contain at least one uppercase letter!");
      setIsLoading(false);
      return;
    }

    if (!hasSymbol) {
      setError("Password must contain at least one symbol!");
      setIsLoading(false);
      return;
    }

    try {
      const data = await registerUser(name, email, phone, password);
      if (data?.data?.data) {
        window.location.replace(`/auth/otp?email=${email}`);
      }
    } catch (error: any) {
      setError(error?.message || "An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/30 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/main">
            <h1 className="text-4xl font-bold mb-2 cursor-pointer hover:scale-105 transition-transform duration-200">
              Amaze<span className="text-gradient">Com</span>
            </h1>
          </Link>
          <p className="text-gray-600">Create your account to get started</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-8 text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-indigo-100">
              Join thousands of satisfied customers
            </p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleRegisterUser} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

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

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200"
                    placeholder="Enter your mobile number"
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
                    onChange={handlePasswordChange}
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200"
                    placeholder="Create a strong password"
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

                {/* Password Requirements */}
                {password && (
                  <div className="mt-3 space-y-2">
                    <div className={`flex items-center text-sm ${passwordValidation.length ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordValidation.length ? (
                        <CheckCircle size={16} className="mr-2" />
                      ) : (
                        <AlertCircle size={16} className="mr-2" />
                      )}
                      At least 6 characters long
                    </div>
                    <div className={`flex items-center text-sm ${passwordValidation.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordValidation.uppercase ? (
                        <CheckCircle size={16} className="mr-2" />
                      ) : (
                        <AlertCircle size={16} className="mr-2" />
                      )}
                      At least one uppercase letter
                    </div>
                    <div className={`flex items-center text-sm ${passwordValidation.symbol ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordValidation.symbol ? (
                        <CheckCircle size={16} className="mr-2" />
                      ) : (
                        <AlertCircle size={16} className="mr-2" />
                      )}
                      At least one symbol (!@#$%^&*)
                    </div>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !name || !email || !phone || !password || !passwordValidation.length || !passwordValidation.uppercase || !passwordValidation.symbol}
                className="w-full button-gradient flex items-center justify-center space-x-2 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
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
                  <span className="px-4 bg-white text-gray-500">Already have an account?</span>
                </div>
              </div>
            </div>

            {/* Login Link */}
            <Link
              href="/auth/login"
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 border-2 border-gray-200 rounded-xl text-gray-700 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200 font-medium"
            >
              <span>Sign in to your account</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}