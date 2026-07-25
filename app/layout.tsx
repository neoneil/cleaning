import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  buildPageMetadata,
  localBusinessJsonLd,
  siteName,
  siteUrl,
  websiteJsonLd,
} from "@/app/seo";
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
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  creator: siteName,
  publisher: siteName,
  category: "home services",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  ...buildPageMetadata({
    title: "CleanPrime Melbourne | Professional Home Cleaning Services",
    description:
      "CleanPrime Melbourne provides reliable, detail-focused home cleaning across Melbourne, including regular cleaning, deep cleaning, end of lease cleaning, and move in or move out cleaning.",
    path: "/",
  }),
  title: {
    default: "CleanPrime Melbourne | Professional Home Cleaning Services",
    template: "%s | CleanPrime Melbourne",
  },
  other: {
    "geo.region": "AU-VIC",
    "geo.placename": "Melbourne",
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
        <SeoJsonLd data={[localBusinessJsonLd(), websiteJsonLd()]} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
