// app/wp-content/uploads/[...slug]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const slugPath = slug?.join("/");
  if (!slugPath) {
    return new NextResponse("Invalid path", { status: 400 });
  }

  const targetUrl = `https://admin.taisaovayem.com/wp-content/uploads/${slugPath}`;

  try {
    const externalRes = await fetch(targetUrl);
    if (!externalRes.ok) {
      return new NextResponse("Image not found", { status: 404 });
    }

    const contentType =
      externalRes.headers.get("content-type") || "application/octet-stream";
    const buffer = await externalRes.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    console.error("Proxy error:", err);
    return new NextResponse("Server error", { status: 500 });
  }
}
