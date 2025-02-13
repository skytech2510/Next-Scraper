import type { Metadata } from "next";
import localFont from "next/font/local";
import MainProvider from "@/contexts";

import ThemeToggle from "@/components/Theme/ThemeToggle";
import Navbar from "@/components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Grab Profiles",
  description: "Generated for scrape profile data",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>
          <MainProvider>
            <div className="flex flex-col w-full h-screen">
              <div className="fixed z-50 top-0 right-0 mt-4 mr-4">
                <ThemeToggle />
              </div>
              <Navbar />
              {children}
              <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="light"
              />
            </div>
          </MainProvider>
        </main>
      </body>
    </html>
  );
}
