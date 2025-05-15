import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Import Inter from next/font/google
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// Define the Inter font
const inter = Inter({
  subsets: ["latin"], // Specify the character subsets you need
  variable: "--font-inter", // Optional: Define a CSS variable for the font
});

export const metadata: Metadata = {
  title: "SMB Digital Zone Test",
  description: "Developed by Fahad Abdul Qayyum",
};

// RootLayout component serves as the main layout for the application
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          {/* Preconnect links for Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Fonts CSS */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}