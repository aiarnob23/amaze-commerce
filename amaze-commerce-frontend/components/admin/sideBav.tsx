"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSideBar() {
  const pathname = usePathname(); 

  return (
    <div className="flex flex-col min-h-[2000px] bg-yellow-50 px-1 md:px-8 py-8 gap-16 text-sm md:text-xl font-normal md:font-semibold">
      <div>
        <Link
          href="/admin/products/1"
          className={`block px-4 py-2 ${
            pathname.startsWith("/admin/products") ? "text-base md:text-2xl" : ""
          }`}
        >
          Products
        </Link>
      </div>
      <div>
        <Link
          href="/admin/add-product"
          className={`block px-4 py-2 ${
            pathname === "/admin/add-products" ? "text-base md:text-2xl" : ""
          }`}
        >
          Add Product
        </Link>
      </div>
      <div>
        <Link
          href="/admin/carts"
          className={`block px-4 py-2 ${
            pathname === "/admin/carts" ? "text-base md:text-2xl" : ""
          }`}
        >
          Carts
        </Link>
      </div>
      <div>
        <Link
          href="/admin/customers"
          className={`block px-4 py-2 ${
            pathname === "/admin/customers" ? "text-base md:text-2xl" : ""
          }`}
        >
          Customers
        </Link>
      </div>
      <div>
        <Link
          href="/admin/statistics"
          className={`block px-4 py-2 ${
            pathname === "/admin/statistics" ? "text-base md:text-2xl" : ""
          }`}
        >
          Statistics
        </Link>
      </div>
    </div>
  );
}
