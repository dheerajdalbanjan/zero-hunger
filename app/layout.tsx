import type { Metadata } from "next";
import { Bai_Jamjuree, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "./provider";

const inter = Bai_Jamjuree({subsets:['latin'],weight:'400'})

export const metadata: Metadata = {
  title: "Zero Hunger",
  description: "Minor Project 1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; 
}>) {
  return (
    <html lang="en">
          <AuthProvider>

      <body className={inter.className}>
      <Navbar />
        {children}
        <Footer />
        </body>
        </AuthProvider>
    </html>
  );
}
