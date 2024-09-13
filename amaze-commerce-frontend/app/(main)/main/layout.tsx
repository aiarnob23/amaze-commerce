import Footer from "@/components/footer/footer";
import NavBar from "@/components/navbar/navbar";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Amaze Commerce",
  description: "Buy your neccessary products at lower cost. Secured payment system is available.",
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
