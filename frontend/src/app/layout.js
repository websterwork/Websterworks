// app/layout.js
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { AuthProvider } from "../contexts/AuthContext";
import FloatingChat from "../Components/Chat/FloatingChat"; // Import the chat component

const syncopate = localFont({
  src: [
    { path: "../../public/fonts/Syncopate-Regular.woff2", weight: "400" },
    { path: "../../public/fonts/Syncopate-Bold.woff2", weight: "700" },
  ],
  variable: "--font-syncopate",
});

const spaceGrotesk = localFont({
  src: [
    { path: "../../public/fonts/SpaceGrotesk-Light.woff2", weight: "300" },
    { path: "../../public/fonts/SpaceGrotesk-Regular.woff2", weight: "400" },
    { path: "../../public/fonts/SpaceGrotesk-Medium.woff2", weight: "500" },
    { path: "../../public/fonts/SpaceGrotesk-SemiBold.woff2", weight: "600" },
    { path: "../../public/fonts/SpaceGrotesk-Bold.woff2", weight: "700" },
  ],
  variable: "--font-space-grotesk",
});

export const metadata = {
  metadataBase: new URL("https://websterwork.com"),

  title: {
    default: "Websterwork | Weave, Your Business Web",
    template: "%s | Websterwork",
  },

  description:
    "Websterwork helps businesses weave a powerful digital web through modern websites, custom software, AI-powered solutions, and digital strategies that attract, engage, and grow their customers.",

  applicationName: "Websterwork",

  keywords: [
    "Websterwork",
    "Software Development Company",
    "Web Development",
    "Custom Software",
    "Next.js Development",
    "React Development",
    "AI Development",
    "Business Website",
    "UI UX Design",
    "Digital Transformation",
    "Web Applications",
    "Pakistan Software Company",
  ],

  authors: [
    {
      name: "Websterwork",
      url: "https://websterwork.com",
    },
  ],

  creator: "Websterwork",

  publisher: "Websterwork",

  category: "Information Technology",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://websterwork.com",
    siteName: "Websterwork",

    title: "Websterwork | Weave, Your Business Web",

    description:
      "Websterwork helps businesses weave a powerful digital web through modern websites, custom software, AI-powered solutions, and digital strategies that attract, engage, and grow their customers.",

    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Websterwork",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Websterwork | Weave, Your Business Web",

    description:
      "Websterwork helps businesses weave a powerful digital web through modern websites, custom software, AI-powered solutions, and digital strategies that attract, engage, and grow their customers.",

    images: ["/images/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
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
            <FloatingChat /> {/* Add the floating chat button here */}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
