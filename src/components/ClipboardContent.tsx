"use client";
import { replaceRoute } from "@/helpers";
import { Text } from "@radix-ui/themes";
import { forwardRef } from "react";

type ClipboardContentProps = {
  title: string;
  html: string;
};

export const ClipboardContent = forwardRef<
  HTMLDivElement,
  ClipboardContentProps
>(function ClipboardContent({ title, html }: ClipboardContentProps, ref) {
  const thumbnail = html
    ?.match(/<img [^>]*src="[^"]*"[^>]*>/gm)
    ?.map((x) => x.replace(/.*src="([^"]*)".*/, "$1"));
  const background = thumbnail?.length ? thumbnail[0] : "/quote-background.jpg";

  return (
    <div
      className="bg-cover w-[1000px] min-h-[600px] h-auto p-8 flex items-center justify-center relative bg-center"
      ref={ref}
    >
      <div
        className="bg-cover absolute -left-6 -top-6 -right-6 -bottom-5 -z-0 bg-slate-600"
        style={{
          backgroundImage: `url('${replaceRoute(background)}')`,
          filter: "saturate(180%) blur(20px)",
        }}
      ></div>
      <div className="bg-cover absolute -left-6 -top-6 -right-6 -bottom-5 -z-0 bg-black opacity-10"></div>
      <div className={thumbnail?.length ? "z-10 w-full p-10" : "z-10 p-10"}>
        <Text
          as="div"
          size="9"
          weight="bold"
          className="mb-10 text-white mix-blend-overlay"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {html ? (
          <Text
            as="div"
            size="8"
            className="mix-blend-screen [&>p]:leading-[1.5] text-white [&>figure]:w-full [&>figure>img]:w-full [&>figure>img]:h-auto"
            dangerouslySetInnerHTML={{
              __html: replaceRoute(html),
            }}
          ></Text>
        ) : null}
      </div>
    </div>
  );
});

export default ClipboardContent;
