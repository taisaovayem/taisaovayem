import { Post } from "@/api";

export function getThumbnail(post: Post) {
  const postContentHtml = post.content.rendered;
  if (!postContentHtml) {
    return null;
  }
  const sources = postContentHtml
    ?.match(/<img [^>]*src="[^"]*"[^>]*>/gm)
    ?.map((x) => x.replace(/.*src="([^"]*)".*/, "$1"));
  return sources;
}

export function replaceRoute(content: string): string {
  return content.replace(
    /https?:\/\/admin\.taisaovayem\.com/g,
    ""
  );
}
