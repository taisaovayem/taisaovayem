"use client";
import { Heading } from "@radix-ui/themes";
import { renderToString } from "react-dom/server";

type PostTitleProps = {
  children: string;
};

export function PostTitle({ children }: PostTitleProps) {
  function copyTitle() {
    navigator.clipboard.writeText(renderToString(children));
  }

  return (
    <Heading
      onClick={copyTitle}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
}

export default PostTitle;
