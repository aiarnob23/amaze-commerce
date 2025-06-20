"use client";

import { useAuth } from "@/app/provider/AuthProvider";
import { resendOTP, verifyEmail } from "@/lib/user";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Mail, Shield, RotateCcw, ArrowRight } from "lucide-react";

export default function OTP() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const email = searchParams.get("email");
  const [OTP, setOTP] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const checkOTP = async () => {
    if (!OTP || OTP.length < 6) return;
    
    setIsVerifying(true);
    try {
      await verifyEmail(OTP, email ? email : "");
    } catch (error) {
      console.error("OTP verification failed:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      await resendOTP(user?._id);
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    } finally {
      setIsResending(false);
    }
  };

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOTP(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && OTP.length === 6) {
      checkOTP();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/30 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Amaze<span className="text-gradient">Com</span>
          </h1>
          <p className="text-gray-600">Verify your email to continue</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-8 text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Email Verification</h2>
            <p className="text-indigo-100">
              We've sent a 6-digit code to your email
            </p>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Email Display */}
            <div className="mb-6">
              <div className="flex items-center justify-center p-4 bg-gray-50 rounded-xl">
                <Mail size={18} className="text-indigo-500 mr-2" />
                <span className="text-gray-700 font-medium">
                  {email || "your-email@example.com"}
                </span>
              </div>
            </div>

            {/* OTP Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Enter 6-digit verification code
              </label>
              <input
                type="text"
                value={OTP}
                onChange={handleOTPChange}
                onKeyPress={handleKeyPress}
                placeholder="000000"
                className="w-full px-6 py-4 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200 tracking-widest"
                maxLength={6}
              />
              <p className="text-xs text-gray-500 text-center mt-2">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            {/* Verify Button */}
            <button
              onClick={checkOTP}
              disabled={OTP.length < 6 || isVerifying}
              className="w-full button-gradient flex items-center justify-center space-x-2 py-4 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            >
              {isVerifying ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Verify Email</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>

            {/* Resend Section */}
            <div className="text-center">
              <p className="text-gray-600 mb-3">Didn't receive the code?</p>
              <button
                onClick={handleResendOTP}
                disabled={isResending}
                className="inline-flex items-center space-x-2 px-4 py-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-indigo-300 border-t-indigo-600 rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <RotateCcw size={16} />
                    <span>Resend Code</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Check your spam folder if you don't see the email
          </p>
        </div>
      </div>
    </div>
  );
}