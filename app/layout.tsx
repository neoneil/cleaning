import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

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
    default: "Clean Prime Melbourne | Professional Home Cleaning Services",
    template: "%s | Clean Prime Melbourne",
  },
  description:
    "Clean Prime Melbourne provides reliable and detail-focused home cleaning services across Melbourne, including regular cleaning, deep cleaning, and end of lease cleaning.",
  keywords: [
    "cleaning services Melbourne",
    "house cleaning Melbourne",
    "home cleaning Melbourne",
    "end of lease cleaning Melbourne",
    "deep cleaning Melbourne",
    "cleaner near me",
  ],
  openGraph: {
    title: "Clean Prime Melbourne | Professional Home Cleaning Services",
    description:
      "Reliable and detail-focused home cleaning services across Melbourne.",
    url: "https://cleanprime.com.au",
    siteName: "Clean Prime Melbourne",
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}