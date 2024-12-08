import { Footer } from "@/components";
import * as React from "react";
import { Theme, Container } from "@radix-ui/themes";


export function CommontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Theme>
      <Container size="4" className="p-4 xl:p-0">
        <main className="pt-6">{children}</main>
        <Footer />
      </Container>
    </Theme>
  );
}
