"use client";
import { Card, IconButton, Link, Text } from "@radix-ui/themes";
import ClipboardContent from "./ClipboardContent";
import { useRef } from "react";
import * as htmlToImage from "html-to-image";
import { CopyIcon, Link2Icon } from "@radix-ui/react-icons";
import styles from "./PostCard.module.css";
import { replaceRoute } from "@/helpers";

export type PostCardProps = {
  title: string;
  slug: string;
  description: string;
  html: string;
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
    <Card className={`shadow-lg ${styles["post-card"]}`}>
      <Link href={`/${slug}`}>
        {Boolean(title) && (
          <Text
            as="div"
            size="2"
            weight="bold"
            className="mb-4"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
        <Text
          as="div"
          color="gray"
          size="2"
          dangerouslySetInnerHTML={{ __html: replaceRoute(description) }}
        ></Text>
      </Link>
      <div className={`absolute right-2 top-2 hidden ${styles["copy-button"]}`}>
        <div>
          <IconButton
            title="Copy"
            variant="soft"
            onClick={copyContent}
            radius="full"
            color="plum"
          >
            <CopyIcon />
          </IconButton>
        </div>
        <div>
          <IconButton
            title="Copy link"
            variant="soft"
            onClick={() =>
              navigator.clipboard.writeText(
                `https://${
                  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "taisaovayem.com"
                }/${slug}`
              )
            }
            color="green"
            radius="full"
          >
            <Link2Icon />
          </IconButton>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: "<!--googleoff: all-->" }} />
      <div className="w-0 h-0 overflow-hidden">
        <ClipboardContent title={title} html={html} ref={contentRef} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: "<!--googleoff: all-->" }} />
    </Card>
  );
}

export default PostCard;
