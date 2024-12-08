"use client";
import { Heading } from "@radix-ui/themes";
import { ReactNode } from "react";
import { renderToString } from "react-dom/server";

type PostTitleProps = {
  children: ReactNode;
};

export function PostTitle({ children }: PostTitleProps) {
  function copyTitle() {
    navigator.clipboard.writeText(renderToString(children));
  }

  return <Heading onClick={copyTitle}>{children}</Heading>;
}

export default PostTitle;
