"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Package, 
  Plus, 
  ShoppingCart, 
  Users, 
  BarChart3,
  Settings,
  Home,
  ChevronLeft,
  Menu
} from "lucide-react";
import { useState } from "react";

export default function AdminSideBar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: Home,
      isActive: pathname === "/admin"
    },
    {
      href: "/admin/products/1",
      label: "Products",
      icon: Package,
      isActive: pathname.startsWith("/admin/products")
    },
    {
      href: "/admin/add-product",
      label: "Add Product",
      icon: Plus,
      isActive: pathname === "/admin/add-product"
    },
    {
      href: "/admin/carts",
      label: "Carts",
      icon: ShoppingCart,
      isActive: pathname === "/admin/carts"
    },
    {
      href: "/admin/customers",
      label: "Customers",
      icon: Users,
      isActive: pathname === "/admin/customers"
    },
    {
      href: "/admin/statistics",
      label: "Statistics",
      icon: BarChart3,
      isActive: pathname === "/admin/statistics"
    }
  ];

  return (
    <div className={`
      flex flex-col min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/30 
      border-r border-gray-200/60 backdrop-blur-sm transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-20' : 'w-64 md:w-72'}
    `}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200/60">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Admin Panel
              </h2>
              <p className="text-sm text-gray-500 mt-1">Manage your store</p>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/60 hover:bg-white/80 transition-all duration-200 hover:scale-105 shadow-sm"
          >
            {isCollapsed ? (
              <Menu size={20} className="text-gray-600" />
            ) : (
              <ChevronLeft size={20} className="text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group relative flex items-center rounded-xl transition-all duration-200 
                ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3'}
                ${item.isActive 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25' 
                  : 'text-gray-700 hover:bg-white/60 hover:shadow-md backdrop-blur-sm border border-transparent hover:border-gray-200/60'
                }
              `}
            >
              {/* Active indicator */}
              {item.isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl opacity-100"></div>
              )}
              
              {/* Icon */}
              <div className="relative z-10 flex items-center">
                <Icon 
                  size={20} 
                  className={`
                    transition-all duration-200
                    ${item.isActive ? 'text-white' : 'text-gray-600 group-hover:text-indigo-600'}
                    ${!isCollapsed && 'mr-3'}
                  `} 
                />
                
                {/* Label */}
                {!isCollapsed && (
                  <span className={`
                    font-medium transition-all duration-200
                    ${item.isActive ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'}
                  `}>
                    {item.label}
                  </span>
                )}
              </div>

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                  {item.label}
                  <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              )}

              {/* Hover effect */}
              {!item.isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200/60">
        <Link
          href="/admin/settings"
          className={`
            group flex items-center rounded-xl transition-all duration-200 
            ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3'}
            ${pathname === "/admin/settings" 
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25' 
              : 'text-gray-700 hover:bg-white/60 hover:shadow-md backdrop-blur-sm border border-transparent hover:border-gray-200/60'
            }
          `}
        >
          <Settings 
            size={20} 
            className={`
              transition-all duration-200
              ${pathname === "/admin/settings" ? 'text-white' : 'text-gray-600 group-hover:text-indigo-600'}
              ${!isCollapsed && 'mr-3'}
            `} 
          />
          {!isCollapsed && (
            <span className={`
              font-medium transition-all duration-200
              ${pathname === "/admin/settings" ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'}
            `}>
              Settings
            </span>
          )}

          {/* Tooltip for collapsed state */}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
              Settings
              <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}