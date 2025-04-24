import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Discover the Power of a Well-Designed Blog Website",
    template: "%s - Blog App",
  },
  description: "Discover insightful articles and engaging content on our blog website. Stay updated with the latest trends, tips, and stories that inspire and inform",
  twitter:{
    card: "summary_large_image"
  }
};

export default function RootLayout({
  children,
  topbar,
  footer
}: Readonly<{
  children: React.ReactNode;
  topbar: React.ReactNode;
  footer: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-800`}
      >
        {topbar}
        {children}
        {footer}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
