import Footer from "@/components/footer/footer";
import NavBar from "@/components/navbar/navbar";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar/>
      {children}
      <Footer/>
    </div>
  );
}
