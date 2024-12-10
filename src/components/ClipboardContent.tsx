"use client";
import { Post } from "@/helpers/post";
import { Text } from "@radix-ui/themes";
import { forwardRef } from "react";

type ClipboardContentProps = {
  post: Post;
};

export const ClipboardContent = forwardRef<
  HTMLDivElement,
  ClipboardContentProps
>(function ClipboardContent({ post }: ClipboardContentProps, ref) {
  
  return (
    <div
      className="bg-cover w-96 min-h-64 h-auto p-8 flex items-center justify-center relative"
      style={{ backgroundImage: "url('/quote-background.jpg')" }}
      ref={ref}
    >
      <div
        className="bg-cover absolute -left-6 -top-6 -right-6 -bottom-5 -z-0"
        style={{
          backgroundImage: "url('/quote-background.jpg')",
          filter: "saturate(180%) blur(20px)",
        }}
      ></div>
      <div className="z-10">
        <Text
          as="div"
          size="6"
          weight="bold"
          className="mb-4 text-white"
        >
          {post.data.title}
        </Text>
        <Text
          as="div"
          size="2"
          className="mix-blend-screen text-white"
          dangerouslySetInnerHTML={{ __html: post.html }}
        ></Text>
      </div>
    </div>
  );
});

export default ClipboardContent;
