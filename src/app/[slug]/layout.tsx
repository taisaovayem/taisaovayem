import { getPostBySlug } from "@/api";
import { LangLayout } from "@/components";
import { CommontLayout } from "@/components/CommonLayout";
import { LANG_CATEGORY_ID } from "@/constants";
import * as React from "react";

export default async function PostLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{slug: string}>
}>) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (post.categories.find(categoryId => categoryId === LANG_CATEGORY_ID)) {
    return <LangLayout>{children}</LangLayout>
  }
  return <CommontLayout>{children}</CommontLayout>;
}
