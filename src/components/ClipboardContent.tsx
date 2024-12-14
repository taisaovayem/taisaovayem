"use client";
import { Text } from "@radix-ui/themes";
import { forwardRef } from "react";
import { Value } from "vfile";

type ClipboardContentProps = {
  title: string;
  html: Value;
};

export const ClipboardContent = forwardRef<
  HTMLDivElement,
  ClipboardContentProps
>(function ClipboardContent({ title, html }: ClipboardContentProps, ref) {
  const thumbnail = html
    ?.toString()
    ?.match(/<img [^>]*src="[^"]*"[^>]*>/gm)
    ?.map((x) => x.replace(/.*src="([^"]*)".*/, "$1"));
  const background = thumbnail?.length ? thumbnail[0] : "/quote-background.jpg";

  return (
    <div
      className="bg-cover w-96 min-h-64 h-auto p-8 flex items-center justify-center relative bg-center"
      ref={ref}
    >
      <div
        className="bg-cover absolute -left-6 -top-6 -right-6 -bottom-5 -z-0 bg-slate-600"
        style={{
          backgroundImage: `url('${background}')`,
          filter: "saturate(180%) blur(20px)",
        }}
      ></div>
      <div className="bg-cover absolute -left-6 -top-6 -right-6 -bottom-5 -z-0 bg-black opacity-10"></div>
      <div className="z-10">
        <Text
          as="div"
          size="6"
          weight="bold"
          className="mb-4 text-white mix-blend-overlay"
        >
          {title}
        </Text>
        {html?.toString() ? (
          <Text
            as="div"
            size="2"
            className="mix-blend-screen text-white"
            dangerouslySetInnerHTML={{ __html: html }}
          ></Text>
        ) : null}
      </div>
    </div>
  );
});

export default ClipboardContent;
