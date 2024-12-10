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
      className="bg-cover w-96 min-h-64 h-auto p-8 flex items-center justify-center"
      style={{ backgroundImage: "url('/quote-background.jpg')" }}
      ref={ref}
    >
      <div>
        <Text
          as="div"
          size="6"
          weight="bold"
          className="mb-4 mix-blend-overlay"
        >
          {post.data.title}
        </Text>
        <Text
          as="div"
          size="2"
          dangerouslySetInnerHTML={{ __html: post.html }}
          style={{ color: "yellow", textShadow: "#999999 1px 1px" }}
        ></Text>
      </div>
    </div>
  );
});

export default ClipboardContent;
