"use client";

import { useAuth } from "@/app/provider/AuthProvider";
import { verifyEmail } from "@/lib/user";
import { useState } from "react";

export default function OTP() {
  const [OTP, setOTP] = useState<string>("");
  const { user } = useAuth();
  const checkOTP = async () => {
    verifyEmail(OTP, user?.email);
  }
  return (
    <div className="container mt-24 mb-20 mx-auto">
      <div className="w-full flex justify-center items-center flex-col">
        <h2 className="text-3xl font-bold text-gray-600 my-5">
          Greetings from Amaze<span className="text-yellow-500">Com</span>
        </h2>
        <p className="text-xl font-semibold mb-4">Please verify your email</p>
        <p className="text-xl mb-3">We have sent an OTP to your email.</p>
        <div>
          <label
            htmlFor="OTP"
            className="text-xl font-semibold text-gray-800 mr-4"
          >
            Enter OTP:
          </label>
          <input
            type="text"
            className="border-2 px-2 py-1 rounded-lg border-yellow-300"
            onChange={(e) => setOTP(e.target.value)}
          />
          <button
            onClick={checkOTP}
            className="btn btn-ghost shadow-md shadow-gray-200 text-green-700 ml-4 text-xl"
          >
            Confirm
          </button>
        </div>
        <div>
          Having trouble?
          <button className="btn my-6 ml-2 btn-warning  text-[16px]">
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
}