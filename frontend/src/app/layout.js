// app/layout.js
// use client;
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { AuthProvider } from "../contexts/AuthContext";

// Local fonts
const syncopate = localFont({
  src: [
    { path: "../public/fonts/Syncopate-Regular.woff2", weight: "400" },
    { path: "../public/fonts/Syncopate-Bold.woff2", weight: "700" }
  ],
  variable: "--font-syncopate"
});

const spaceGrotesk = localFont({
  src: [
    { path: "../public/fonts/SpaceGrotesk-300.woff2", weight: "300" },
    { path: "../public/fonts/SpaceGrotesk-Regular.woff2", weight: "400" },
    { path: "../public/fonts/SpaceGrotesk-500.woff2", weight: "500" },
    { path: "../public/fonts/SpaceGrotesk-600.woff2", weight: "600" },
    { path: "../public/fonts/SpaceGrotesk-Bold.woff2", weight: "700" }
  ],
  variable: "--font-space-grotesk"
});

export const metadata = {
  title: "Websterwork - AI Powered Software Development",
  description:
    "Websterwork is a software development company that leverages AI to deliver innovative solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${syncopate.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body
        className={`${spaceGrotesk.className} antialiased h-full bg-white dark:bg-black`}
      >
        <AuthProvider>
          <div className="min-h-full flex flex-col overflow-y-hidden">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
