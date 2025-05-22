"use client";
import { Heading } from "@radix-ui/themes";
import { useRef } from "react";
import { renderToString } from "react-dom/server";

type PostTitleProps = {
  children: string;
};

export function PostTitle({ children }: PostTitleProps) {
  const contentRef = useRef<HTMLHeadingElement>(null);
  function copyTitle() {
    if (contentRef.current) {
      const content = contentRef.current.innerHTML;
      navigator.clipboard.writeText(content);
    }
  }

  return (
    <Heading
      ref={contentRef}
      onClick={copyTitle}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
}

export default PostTitle;
