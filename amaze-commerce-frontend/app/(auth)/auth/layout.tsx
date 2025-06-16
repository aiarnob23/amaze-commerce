import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Amaze Commerce",
  description: "Lower cost E-commerce website. Fast delivery. Secured authentication. Secured payment system.",
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
        <p className="text-xl px-6 lg:px-0 text-gray-500">©2024, AmazeCom.com, Inc. or its affiliates</p>
      </div>
    </div>
  );
}
