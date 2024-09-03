"use client";
import { useAuth } from "@/app/provider/AuthProvider";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string | ''>('');
  const [password, setPassword] = useState<string | ''>('');
  const { login } = useAuth();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const res : any = await login(email, password);
    if (res) {
      window.location.replace('/main');
    }
    //localStorage.setItem('accessToken', res.data.data.accessToken);
  }
  return (
    <div className="container  mx-auto justify-center mb-20 items-center flex w-full">
      <div className="relative z-10">
        <Link href='/main'>
          <h1 className="text-3xl font-bold text-center my-4">
            Amaze<span className="text-yellow-500">Com</span>
          </h1>
        </Link>
        <div className="flex flex-col shadow-running-animation justify-center border-2 py-12 shadow-lg  px-8 rounded-lg items-start">
          <h3 className="text-4xl font-semibold mb-6">Sign in</h3>
          <div>
            <form onSubmit={handleLogin} action="" className="flex flex-col">
              <label htmlFor="email" className="text-xl font-semibold mb-1">
                Your email
              </label>
              <input
                type="email"
                className=" rounded-lg p-2 mb-4 w-[400px] border-gray-400 border-2"
                onChange={(e)=>setEmail(e.target.value)}
              />
              <label htmlFor="password" className="text-xl font-semibold mb-1">
                Enter password
              </label>
              <input
                type="password"
                className=" rounded-lg p-2 mb-4 w-[400px] border-gray-400 border-2"
                onChange={(e)=>setPassword(e.target.value)}
              />
              <button type="submit" className="text-xl font-semibold btn btn-warning">
                Continue
              </button>
            </form>
            <hr className="border-2 my-8 border-gray-300" />
            <div className="flex flex-col justify-center items-center gap-3 mt-2">
              <p className="text-xl ">New to AmazeCom?</p>
              <Link
                className=" w-full btn btn-ghost text-gray-600 shadow-gray-300 shadow-lg py-2 text-xl font-semibold"
                href="/auth/register"
              >
                Create your Amaze account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
