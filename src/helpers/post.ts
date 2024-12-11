import path from "path";
import fs from "fs";
import { ENCODING, POST_DIRECTORY } from "@/constants";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import matter from "gray-matter";
import { Value } from "vfile";
import clip from "@/helpers/text-clipper";

function getMdFileName(slug: string) {
  const mdFileName = slug.match(/^[0-9a-zA-Z_\-. ]+.(md|mdx)$/gim)
    ? slug
    : slug + ".md";
  return mdFileName;
}

export type Post = {
  title: string;
  category: string[];
  createdAt: Date;
  tag: string[];
  slug: string;
  description: Value;
  html: Value;
};

export async function getPost(slug: string): Promise<Post> {
  const mdFileName = getMdFileName(slug);
  const postPath = path.join(POST_DIRECTORY, mdFileName);
  const postFileContent = fs.readFileSync(postPath, ENCODING);
  const stat = fs.statSync(postPath);
  const matterResult = matter(postFileContent);
  const postHtml = await unified()
    .use(remarkParse) // Convert into markdown AST
    .use(remarkRehype, { allowDangerousHtml: true }) // Transform to HTML AST
    .use(rehypeStringify, { allowDangerousHtml: true }) // Convert AST into serialized HTML
    .process(matterResult.content);
  return {
    ...matterResult.data,
    html: postHtml.value,
    createdAt: stat.birthtime,
  } as Post;
}

export async function getAllPost() {
  const fileList = fs.readdirSync(POST_DIRECTORY);
  const allPost: Post[] = [];
  for (const fileName of fileList) {
    const slug = fileName.replaceAll(".md", "");
    const post = await getPost(slug);
    allPost.push({
      ...post,
      slug,
      description: clip(post.html?.toString(), 500, {
        html: true,
        maxLines: 5,
      }),
      html: post.html,
    });
  }
  return allPost.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
}

export function getThumbnail(post: Post) {
  const postContentHtml = post.html?.toString();
  if (!postContentHtml) {
    return null;
  }
  const sources = postContentHtml
    ?.match(/<img [^>]*src="[^"]*"[^>]*>/gm)
    ?.map((x) => x.replace(/.*src="([^"]*)".*/, "$1"));
  return sources;
}
