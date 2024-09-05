"use client";
import { useAuth } from "@/app/provider/AuthProvider";
import UserIcon from "@/public/icons/user.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";


export default function AdminNavbar() {
  const { user, logout } = useAuth();
  const [userItemsVisible, setUsersItemsVisible] = useState<boolean>(false);
  const userIconRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleUserItems = () => {
    setUsersItemsVisible((prevVisible) => !prevVisible);
  };

  const handleLogOut = async () => {
    logout();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !userIconRef.current?.contains(event.target as Node)
      ) {
        setUsersItemsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  return (
    <div>
      <div className="navbar  bg-base-200 text-[#1E2A5E] relative">
              <div className="navbar-start">
                  
         </div>
        {/* Navbar center */}
        <div className="navbar-center hidden lg:flex">
          <h2 className="text-2xl font-bold">Amaze<span className="text-yellow-500">Com</span></h2>
        </div>
        {/* Navbar end */}
        <div className="navbar-end">
          <button
            onClick={toggleUserItems}
            ref={userIconRef}
            className="btn btn-ghost"
          >
            <Image src={UserIcon} alt="user" height={20} width={20} />
          </button>
          {userItemsVisible && (
            <div
              ref={dropdownRef}
              className="absolute right-0 top-12 bg-base-100 rounded-box shadow-lg z-10"
            >
              <ul className="menu menu-compact p-2">
                <li>
                  <Link href="/main/user/profile">Profile</Link>
                </li>
                {user ? (
                  <li>
                    <button onClick={handleLogOut}>Logout</button>
                  </li>
                ) : (
                  <li>
                    <Link href="/auth/login">Login</Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
