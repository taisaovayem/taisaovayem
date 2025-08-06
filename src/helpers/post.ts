import { Post } from "@/api";
import { convert } from "html-to-text";

export function replaceRoute(content: string): string {
  if (!content) {
    return "";
  }
  return content
    .replace(/https?:\/\/admin\.taisaovayem\.com/g, "")
    .replace(/wp-content\/uploads/g, "uploads");
}

export function getThumbnail(post: Post) {
  const postContentHtml = post.content.rendered;
  if (!postContentHtml) {
    return null;
  }
  const sources = postContentHtml
    ?.match(/<img [^>]*src="[^"]*"[^>]*>/gm)
    ?.map((x) => replaceRoute(x.replace(/.*src="([^"]*)".*/, "$1")));
  return sources;
}


export function getDescription(content: string) {
  const contentSplit = content.split("<br />");
  let countCharacter = 0;
  const finalContent = contentSplit.reduce((previous, current) => {
    countCharacter += convert(current).length;
    if (countCharacter < 500) {
      previous.push(current);
    }
    return previous;
  }, [] as string[]);
  return finalContent.join("<br />");
}
