import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rateLimitMap = new Map<
  string,
  { count: number; timestamp: number }
>();

const WINDOW_SIZE = 60 * 1000; // 1 phút
const MAX_REQUESTS = 100; // 100 request / phút

export function proxy(request: NextRequest) {
  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for") ??
    "anonymous";

  const now = Date.now();

  const data = rateLimitMap.get(ip);

  if (!data) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
  } else {
    if (now - data.timestamp < WINDOW_SIZE) {
      data.count += 1;

      if (data.count > MAX_REQUESTS) {
        return new NextResponse("Too Many Requests", { status: 429 });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};