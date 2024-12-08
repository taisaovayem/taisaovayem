import * as React from "react";
import { CommontLayout } from "@/components/CommonLayout";

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CommontLayout>{children}</CommontLayout>;
}
