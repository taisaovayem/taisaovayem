import { Footer } from "@/components";
import * as React from "react";
import { Theme, Container } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";

export function LangLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider attribute="class">
      <Theme>
        Comming soon...
        <main className="pt-6">{children}</main>
      </Theme>
    </ThemeProvider>
  );
}
