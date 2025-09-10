import * as React from "react";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";

export function LangLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider attribute="class">
      <Theme>
        <main className="bg-[url(/lang-background.jpeg)] bg-no-repeat bg-top bg-center bg-[length:100%_auto] bg-fixed w-full min-h-screen">{children}</main>
      </Theme>
    </ThemeProvider>
  );
}
