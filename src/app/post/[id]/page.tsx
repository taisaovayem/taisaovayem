import { getPost } from "@/helpers";
import fs from "fs";
import { POST_DIRECTORY } from "@/constants";
import Link from "next/link";
import { createSlug } from "@/helpers/string";

type PostProps = {
  id: string;
};

export async function generateStaticParams() {
  const fileList = fs.readdirSync(POST_DIRECTORY);
  const postList: PostProps[] = [];
  for (const fileName of fileList) {
    const slug = fileName.replaceAll(".md", "");
    postList.push({
      id: slug,
    });
  }
  return postList;
}

export default async function Post({ params }: { params: Promise<PostProps> }) {
  const { id } = await params;
  const post = await getPost(id);
  return (
    <>
      <article className="w-full">
        <header>
          <h1>{post.data.title}</h1>
        </header>
        <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
      </article>
      <article>
        Danh mục:
        <ul className="list-none">
          {post.data.category.map((categoryName) => (
            <li key={categoryName}>
              <Link href={`/category/${createSlug(categoryName)}`}>
                {categoryName}
              </Link>
            </li>
          ))}
        </ul>
      </article>
      <article>
        Tag:
        <ul className="list-none">
          {post.data.tag.map((tagName) => (
            <li key={tagName}>
              <Link href={`/tag/${createSlug(tagName)}`}>{tagName}</Link>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
