"use client";
import { Card, IconButton, Link, Text } from "@radix-ui/themes";
import { Value } from "vfile";
import ClipboardContent from "./ClipboardContent";
import { useRef } from "react";
import * as htmlToImage from "html-to-image";
import { CopyIcon } from "@radix-ui/react-icons";
import styles from "./PostCard.module.css";

export type PostCardProps = {
  title: string;
  slug: string;
  description: Value;
  html: Value;
};

export function PostCard({ slug, title, description, html }: PostCardProps) {
  const contentRef = useRef<HTMLDivElement>(null);
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
    <Card className={`shadow-lg ${styles['post-card']}`}>
      <Link href={`/post/${slug}`}>
        <Text as="div" size="2" weight="bold" className="mb-4">
          {title}
        </Text>
        <Text
          as="div"
          color="gray"
          size="2"
          dangerouslySetInnerHTML={{ __html: description }}
        ></Text>
      </Link>
      <div className={`absolute right-2 top-2 hidden ${styles['copy-button']}`}>
        <IconButton
          title="Copy"
          variant="soft"
          onClick={copyContent}
          radius="full"
          color="plum"
          className="absolute right-3 top-3"
        >
          <CopyIcon />
        </IconButton>
      </div>
      <div dangerouslySetInnerHTML={{ __html: "<!--googleoff: all-->" }} />
      <div className="w-0 h-0 overflow-hidden">
        <ClipboardContent title={title} html={html} ref={contentRef}/>
      </div>
      <div dangerouslySetInnerHTML={{ __html: "<!--googleoff: all-->" }} />
    </Card>
  );
}

export default PostCard;
