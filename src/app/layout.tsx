import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { GoogleAnalytics } from "@next/third-parties/google";

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
  title: "Tại sao vậy em?",
  description: "Tại sao vậy em?",
};

export function generateViewport(): Viewport {
  return {
    colorScheme: "dark light",
    initialScale: 1,
    width: "device-width",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-transparent`}
      >
        {children}
      </body>
      {process.env.NODE_ENV !== 'development' && <GoogleAnalytics gaId="G-RZ3CZ4ZFLL" />}
    </html>
  );
}
