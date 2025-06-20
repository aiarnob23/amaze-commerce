"use client";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "@/app/provider/AuthProvider";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Menu, User, LogOut, Home, Package, Info, Mail, Shield } from "lucide-react";

export default function NavBar() {
  const { user, logout } = useAuth();
  const [userItemsVisible, setUsersItemsVisible] = useState<boolean>(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState<boolean>(false);
  const [searchFocused, setSearchFocused] = useState<boolean>(false);
  const userIconRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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
      
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setMobileMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Navigation items with icons
  const navItems = [
    { href: "/main", label: "Home", icon: Home },
    { href: "/main/products/1", label: "Products", icon: Package },
    { href: "/main/about", label: "About", icon: Info },
    { href: "/main/contact", label: "Contact", icon: Mail },
    ...(user?.role === "admin" ? [{ href: "/admin/products", label: "Admin", icon: Shield }] : [])
  ];

  const NavLinks = ({ mobile = false }) => (
    <>
      {navItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`${
                mobile 
                  ? "flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-200 rounded-lg"
                  : "flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200 font-medium relative group"
              }`}
              onClick={() => mobile && setMobileMenuVisible(false)}
            >
              <IconComponent size={mobile ? 20 : 18} />
              <span>{item.label}</span>
              {!mobile && (
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
              )}
            </Link>
          </li>
        );
      })}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-100   backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-colors duration-200"
            >
              <Menu size={24} />
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <ul className="flex items-center space-x-1">
              <NavLinks />
            </ul>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <form action="/main/searchResults" method="get" className="relative">
              <div className={`relative transition-all duration-300 ${searchFocused ? 'transform scale-105' : ''}`}>
                <input
                  type="text"
                  name="searchTerm"
                  placeholder="Search products..."
                  className={`w-64 px-4 py-2 pl-10 pr-12 rounded-full border-2 transition-all duration-300 focus:outline-none ${
                    searchFocused 
                      ? 'border-indigo-400 bg-indigo-50/50 shadow-lg' 
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <SearchIcon 
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                    searchFocused ? 'text-indigo-500' : 'text-gray-400'
                  }`}
                  style={{ fontSize: "20px" }} 
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-[2px] rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 hover:scale-105"
                >
                  <SearchIcon style={{ fontSize: "16px" }} />
                </button>
              </div>
            </form>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            
            {/* Mobile search button */}
            <div className="md:hidden">
              <form action="/main/searchResults" method="get" className="relative">
                <input
                  type="text"
                  name="searchTerm"
                  placeholder="Search..."
                  className="w-32 px-3 py-2 pl-8 rounded-full border-2 border-gray-200 text-sm focus:outline-none focus:border-indigo-400 focus:bg-indigo-50/50"
                />
                <SearchIcon 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  style={{ fontSize: "16px" }} 
                />
              </form>
            </div>

            {/* Shopping Cart */}
            <Link href='/main/user/cart' className="relative group">
              <div className="p-2 rounded-full hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 group-hover:scale-105">
                <ShoppingCart size={24} className="text-gray-700 group-hover:text-indigo-600 transition-colors duration-200" />
              </div>
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
                      <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  )}
                  
                  <div className="py-1">
                    {user && (
                      <Link 
                        href="/main/user/profile"
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-200"
                        onClick={() => setUsersItemsVisible(false)}
                      >
                        <User size={16} />
                        <span>Profile</span>
                      </Link>
                    )}
                    
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
        <div 
          ref={mobileMenuRef}
          className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg animate-flip"
        >
          <div className="px-4 py-4">
            <ul className="space-y-1">
              <NavLinks mobile={true} />
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}