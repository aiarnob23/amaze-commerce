"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSideBar() {
  const pathname = usePathname(); // Get the current route

  return (
    <div className="flex flex-col min-h-[2000px] bg-yellow-50 px-16 py-8 gap-16 text-2xl font-semibold">
      <div>
        <Link
          href="/admin/home"
          className={`block px-4 py-2 ${
            pathname === "/admin/home" ? "text-3xl" : ""
          }`}
        >
          Dashboard
        </Link>
      </div>
      <div>
        <Link
          href="/admin/products/1"
          className={`block px-4 py-2 ${
            pathname.startsWith("/admin/products") ? "text-3xl" : ""
          }`}
        >
          Products
        </Link>
      </div>
      <div>
        <Link
          href="/admin/add-product"
          className={`block px-4 py-2 ${
            pathname === "/admin/add-products" ? "text-3xl" : ""
          }`}
        >
          Add Product
        </Link>
      </div>
      <div>
        <Link
          href="/admin/orders"
          className={`block px-4 py-2 ${
            pathname === "/admin/orders" ? "text-3xl" : ""
          }`}
        >
          Orders
        </Link>
      </div>
      <div>
        <Link
          href="/admin/customers"
          className={`block px-4 py-2 ${
            pathname === "/admin/customers" ? "text-3xl" : ""
          }`}
        >
          Customers
        </Link>
      </div>
      <div>
        <Link
          href="/admin/transactions"
          className={`block px-4 py-2 ${
            pathname === "/admin/transactions" ? "text-3xl" : ""
          }`}
        >
          Transactions
        </Link>
      </div>
      <div>
        <Link
          href="/admin/statistics"
          className={`block px-4 py-2 ${
            pathname === "/admin/statistics" ? "text-3xl" : ""
          }`}
        >
          Statistics
        </Link>
      </div>
    </div>
  );
}
