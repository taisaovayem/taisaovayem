"use client";
import { Post } from "@/helpers";
import { Box, IconButton } from "@radix-ui/themes";
import { useRef } from "react";
import PostTitle from "./PostTitle";
import * as htmlToImage from "html-to-image";
import PostCard from "./PostCard";
import { CopyIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import ClipboardContent from "./ClipboardContent";

type PostContentProps = {
  post: Post;
};

export function PostContent({ post }: PostContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  function copyContent() {
    if (contentRef.current) {
      htmlToImage.toBlob(contentRef.current).then((imageBlob) => {
        if (imageBlob) {
          navigator.clipboard.write([
            new ClipboardItem({
              [imageBlob?.type]: imageBlob,
            }),
          ]);
        }
      });
    }
  }
  return (
    <>
      <Box className="bg-gray-100 rounded-xl mb-8 p-9 relative">
        <header className="mb-6">
          <PostTitle>{post.data.title}</PostTitle>
        </header>
        <div
          dangerouslySetInnerHTML={{ __html: post.html }}
          className="text-gray-500"
        ></div>
        <div className="hidden md:absolute right-3 top-3 md:grid gap-x-2 grid-cols-2">
          <div>
            <IconButton
              title="Copy"
              variant="soft"
              onClick={copyContent}
              radius="full"
            >
              <CopyIcon />
            </IconButton>
          </div>
          <div>
            <IconButton
              title="Quay lại"
              variant="soft"
              onClick={() => router.back()}
              color="tomato"
              radius="full"
            >
              <Cross1Icon />
            </IconButton>
          </div>
        </div>
      </Box>
      <div dangerouslySetInnerHTML={{ __html: "<!--googleoff: all-->" }} />
      <div className="h-0 w-0 overflow-hidden">
        <div className="w-96 p-4" ref={contentRef}>
          <ClipboardContent post={post} />
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: "<!--googleoff: all-->" }} />
    </>
  );
}

export default PostContent;
