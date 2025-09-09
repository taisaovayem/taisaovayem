import { LangLayout } from "@/components";
import * as React from "react";

export default async function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LangLayout>{children}</LangLayout>;
}
