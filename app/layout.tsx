import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Nav-Block/Nav-Block";


import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

import "./globals.css";

export const metadata: Metadata = {
  title: "ZakatPro | Institutional Zakat Calculator",
  description:
    "Fulfill your religious obligation with precision. Calculate your Zakat based on live market rates for Gold and Silver.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
   <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
   <head>
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" 
        />
      </head>
      <body>
        <Navbar />
        {children}
        </body>
    </html>
  );
}
