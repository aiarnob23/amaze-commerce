import AdminNavbar from "@/components/admin/navbar";
import AdminSideBar from "@/components/admin/sideBav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amaze Commerce",
  description: "Customers information and Payment system are secured in admin pannel",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AdminNavbar />
      <div className="flex gap-3 md:gap-12">
        <div>
          <AdminSideBar />
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
