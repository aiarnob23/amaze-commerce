"use client";
import { loginUser, registerUser } from "@/lib/user";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleRegisterUser = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password should be at least 6 characters!");
      return;
    }

    if (name && email && phone && password) {
      try {
        const data = await registerUser(name, email, phone, password);
        if (data?.data?.data) {
          console.log(data?.data?.data);
        }
      } catch (error: any) {
        setError(error?.message || "An error occurred during registration.");
      }
    } else {
      setError("All fields must be filled out");
    }
  };

  return (
    <div className="container relative mx-auto justify-center mb-20 items-center flex w-full">
      {/* Background Video */}
      <div className="flex justify-center items-center absolute">
        <video
          poster="/video/register-bg-poster.png"
          autoPlay
          loop
          muted
          className="w-full h-[700px] top-5 rounded-lg relative z-0 object-cover  opacity-70"
        >
          <source src="/video/register-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="relative z-10">
        <Link href="/main">
          <h1 className="text-3xl font-bold text-center my-4">
            Amaze<span className="text-yellow-500">Com</span>
          </h1>
        </Link>
        <div className="flex flex-col md:glass justify-center border-2 py-12 shadow-lg  px-8 rounded-lg items-start">
          <h3 className="text-4xl font-semibold mb-6">Create account</h3>
          <div>
            <form onSubmit={handleRegisterUser} className="flex flex-col">
              <label htmlFor="name" className="text-xl font-semibold mb-1">
                Your name
              </label>
              <input
                type="text"
                className="rounded-lg p-2 mb-4 w-[400px] border-gray-400 border-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="email" className="text-xl font-semibold mb-1">
                Your email
              </label>
              <input
                type="email"
                className="rounded-lg p-2 mb-4 w-[400px] border-gray-400 border-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="phone" className="text-xl font-semibold mb-1">
                Mobile number
              </label>
              <input
                type="tel"
                className="rounded-lg p-2 mb-4 w-[400px] border-gray-400 border-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label htmlFor="password" className="text-xl font-semibold mb-1">
                Enter password
              </label>
              <input
                type="password"
                className="rounded-lg p-2 mb-4 w-[400px] border-gray-400 border-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <div className="text-red-600 mb-2">
                  <p>{error}</p>
                </div>
              )}
              <button className="text-xl font-semibold btn btn-warning">
                Continue
              </button>
            </form>
            <div className="flex gap-3 mt-2">
              <p className="text-xl ">Already have an account? </p>{" "}
              <Link
                className="text-blue-200 text-xl font-semibold"
                href="/auth/login"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
