
import Footer from "@/components/footer/footer";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <div className="flex justify-center items-center">
        <p className="text-xl text-gray-500">© 2024-2026, AmazeCom.com, Inc. or its affiliates</p>
      </div>
    </div>
  );
}
