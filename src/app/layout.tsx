import type { Metadata } from "next";
import { Theme, Container, Link } from "@radix-ui/themes";
import localFont from "next/font/local";
import { HomeIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { QuickNavigate } from "@/components";
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
        <Theme>
          <Container size="4" className="p-4 xl:p-0">
            <main className="pt-6">{children}</main>
            <footer className="w-full py-8 grid gap-4 grid-flow-col auto-cols-max">
              <Link href="/">
                <span className="inline-block align-middle">
                  <HomeIcon />
                </span>{" "}
                Trang chủ
              </Link>
              <Link href="https://github.com/tmthan/taisaovayem">
                <span className="inline-block align-middle">
                  <GitHubLogoIcon />
                </span>{" "}
                Đóng góp
              </Link>
            </footer>
          </Container>
          <QuickNavigate />
        </Theme>
      </body>
      <GoogleAnalytics gaId="G-RZ3CZ4ZFLL" />
    </html>
  );
}
