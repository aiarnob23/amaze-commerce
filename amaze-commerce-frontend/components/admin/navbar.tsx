"use client";
import { useAuth } from "@/app/provider/AuthProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { 
  User, 
  LogOut, 
  Shield, 
  Package, 
  Plus, 
  ShoppingCart, 
  Users, 
  BarChart3,
  Menu,
  X,
  Home
} from "lucide-react";

// Admin Navbar Component
export function AdminNavbar() {
  const { user, logout } = useAuth();
  const [userItemsVisible, setUsersItemsVisible] = useState<boolean>(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState<boolean>(false);
  const userIconRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleUserItems = () => {
    setUsersItemsVisible((prevVisible) => !prevVisible);
  };

  const toggleMobileMenu = () => {
    setMobileMenuVisible((prevVisible) => !prevVisible);
  };

  const handleLogOut = async () => {
    logout();
    setUsersItemsVisible(false);
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
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-colors duration-200"
            >
              {mobileMenuVisible ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/main" className="flex items-center space-x-2 group">
              <div className="hidden sm:block">
                <span className="text-2xl font-bold text-gradient">
                  AmazeCom
                </span>
              </div>
            </Link>
          </div>

          {/* Admin Badge */}
          <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-50 to-pink-50 rounded-full border border-red-200">
            <Shield size={18} className="text-red-600" />
            <span className="text-red-700 font-medium text-sm">Admin Panel</span>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            
            {/* Back to Main Site */}
            <Link 
              href="/main"
              className="hidden sm:flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200 font-medium bg-gray-50 hover:bg-indigo-50 rounded-lg"
            >
              <Home size={18} />
              <span>Main Site</span>
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={toggleUserItems}
                ref={userIconRef}
                className="p-2 rounded-full hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 hover:scale-105 group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
              </button>

              {/* User Dropdown */}
              {userItemsVisible && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-flip"
                >
                  {user && (
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Admin</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  )}
                  
                  <div className="py-1">
                    <Link 
                      href="/main/user/profile"
                      className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-200"
                      onClick={() => setUsersItemsVisible(false)}
                    >
                      <User size={16} />
                      <span>Profile</span>
                    </Link>
                    
                    {user ? (
                      <button 
                        onClick={handleLogOut}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-600 transition-all duration-200"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    ) : (
                      <Link 
                        href="/auth/login"
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-200"
                        onClick={() => setUsersItemsVisible(false)}
                      >
                        <User size={16} />
                        <span>Login</span>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuVisible && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg animate-flip">
          <div className="px-4 py-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200 mb-4">
              <Shield size={18} className="text-red-600" />
              <span className="text-red-700 font-medium text-sm">Admin Panel</span>
            </div>
            <Link 
              href="/main"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-200 rounded-lg"
              onClick={() => setMobileMenuVisible(false)}
            >
              <Home size={20} />
              <span>Back to Main Site</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}