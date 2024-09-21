"use client";

import { useAuth } from "@/app/provider/AuthProvider";
import { resendOTP, verifyEmail } from "@/lib/user";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function OTP() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const email = searchParams.get("email");
  const [OTP, setOTP] = useState<string>("");

  const checkOTP = async () => {
    verifyEmail(OTP, email ? email : "");
  };

  return (
    <div className="container mt-24 mb-20 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full flex justify-center items-center flex-col">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-600 my-5">
          Greetings from Amaze<span className="text-yellow-500">Com</span>
        </h2>
        <p className="text-lg sm:text-xl font-semibold mb-4 text-center">
          Please verify your email
        </p>
        <p className="text-base sm:text-xl mb-3 text-center">
          We have sent an OTP to your email.
        </p>
        <div className="flex flex-col sm:flex-row items-center">
          <label
            htmlFor="OTP"
            className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-0 sm:mr-4"
          >
            Enter OTP:
          </label>
          <input
            type="text"
            className="border-2 px-2 py-1 rounded-lg border-yellow-300 w-52 sm:w-64"
            onChange={(e) => setOTP(e.target.value)}
          />
          <button
            onClick={checkOTP}
            className="btn border-2 font-bold text-sm sm:text-base ml-0 sm:ml-3 mt-3 sm:mt-0 hover:bg-yellow-300 shadow-lg border-gray-300"
          >
            Confirm
          </button>
        </div>
        <div className="mt-4">
          Having trouble?
          <button
            onClick={() => resendOTP(user?._id)}
            className="btn my-6 ml-2 btn-warning text-base sm:text-lg"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
}
