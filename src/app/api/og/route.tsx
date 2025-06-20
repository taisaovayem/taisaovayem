import { getPostBySlug } from "@/api";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { decode } from "he";

export const runtime = "edge"; // Bắt buộc để chạy on-the-fly ở Vercel Edge Functions

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const post = await getPostBySlug(slug || "");
  const thumbnail = post.content.rendered
    ?.match(/<img [^>]*src="[^"]*"[^>]*>/gm)
    ?.map((x) => x.replace(/.*src="([^"]*)".*/, "$1"));
  const background = thumbnail?.length
    ? thumbnail[0]
    : "https://taisaovayem.com/quote-background.jpg";
  const image = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={background}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
          alt="Background"
        />

        <div
          style={{
            position: "relative",
            color: "white",
            zIndex: "2px",
            display: "flex",
            flexDirection: "column",
            maxWidth: 1000,
            textAlign: "left",
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
          }}
        >
          <h1 style={{ fontSize: 64 }}>{decode(post.title.rendered)}</h1>
          <p
            style={{
              fontSize: 48,
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {decode(
              post.content.rendered
                ?.replace(/<br\s*\/?>/gi, "\n")
                ?.replace(/<[^>]+>/g, "")
            )
              .split("\n")
              .map((text, index) => (
                <div key={index}>{text}</div>
              ))}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );

  return new Response(image.body, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
