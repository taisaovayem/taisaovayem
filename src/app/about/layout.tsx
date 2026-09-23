import * as React from "react";
import { Theme, Container } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider attribute="class">
      <Theme>
        <Container size="4" className="p-4 xl:p-0">
          <main className="pt-6">{children}</main>
        </Container>
      </Theme>
    </ThemeProvider>
  );
}
