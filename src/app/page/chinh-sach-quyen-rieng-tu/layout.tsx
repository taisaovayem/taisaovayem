import * as React from "react";
import { Theme, Container } from "@radix-ui/themes";
export default function PrivatePolicyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Theme>
      <Container size="4" className="p-4 xl:p-0">
        <main className="pt-6">{children}</main>
      </Container>
    </Theme>
  );
}
