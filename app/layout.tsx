import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/nav/Navbar";
import Footer from "./components/footer/Footer";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";

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
        <Toaster 
          toastOptions={{
            style: {
              background: "rgb(51 65 85)",
              color: "#fff"
            },
          }}
        />
        <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar/>
          <main className="flex-grow">{children}</main>
          <Footer/>
        </div>
        </CartProvider>
      </body>
    </html>
  );
}
