import { CommontLayout } from "@/components/CommonLayout";
import * as React from "react";

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CommontLayout>{children}</CommontLayout>;
}
