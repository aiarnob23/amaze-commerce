import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./provider/AuthProvider";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amaze E-commerce app",
  description: "Amaze E-commerce for fast delivery at lower price. Discount is available. Secured payment system.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html data-theme="light" lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
