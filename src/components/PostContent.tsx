"use client";
import { Box, IconButton } from "@radix-ui/themes";
import { useRef } from "react";
import PostTitle from "./PostTitle";
import * as htmlToImage from "html-to-image";
import { CopyIcon, Cross1Icon, Link2Icon, HomeIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import ClipboardContent from "./ClipboardContent";
import { Post } from "@/api";
import { replaceRoute } from "@/helpers";

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
      <Box
        className=" rounded-xl mb-8 p-4 md:p-9 relative"
        style={{ background: "var(--gray-a3)" }}
      >
        {Boolean(post.title.rendered) && (
          <header className="mb-6">
            <PostTitle>{post.title.rendered}</PostTitle>
          </header>
        )}
        <div
          dangerouslySetInnerHTML={{
            __html: replaceRoute(post.content.rendered),
          }}
          className="text-gray-500"
        ></div>
        <div className="hidden md:absolute right-3 top-3 md:grid gap-x-2 grid-cols-3">
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
              title="Copy link"
              variant="soft"
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
              color="green"
              radius="full"
            >
              <Link2Icon />
            </IconButton>
          </div>
          <div>
            <IconButton
              title={history?.length > 2 ? "Quay lại" : "Trang chủ"}
              variant="soft"
              onClick={() =>
                history?.length > 2 ? router.back() : router.push("/")
              }
              color="tomato"
              radius="full"
            >
              {history?.length > 2 ? <Cross1Icon /> : <HomeIcon />}
            </IconButton>
          </div>
        </div>
      </Box>
      <div dangerouslySetInnerHTML={{ __html: "<!--googleoff: all-->" }} />
      <div className="w-0 h-0 overflow-hidden">
        <ClipboardContent
          title={post.title.rendered}
          html={post.content.rendered}
          ref={contentRef}
        />
      </div>
      <div dangerouslySetInnerHTML={{ __html: "<!--googleoff: all-->" }} />
    </>
  );
}

export default PostContent;
