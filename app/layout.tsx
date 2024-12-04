import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/nav/Navbar";
import Footer from "./components/footer/Footer";

// Load Poppins font
const poppins = Poppins({
  weight: ["100", "400", "700"], 
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Bahir E-Commerce",
  description: "Get All What You Want!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased text-slate-700`}>
        <div className="flex flex-col min-h-screen">
          <Navbar/>
          <main className="flex-grow">{children}</main>
          <Footer/>
        </div>
      </body>
    </html>
  );
}
