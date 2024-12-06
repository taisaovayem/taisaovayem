import { getAllPostData } from "@/helpers";
import Link from "next/link";
import flattenDepth from "lodash/flatMapDeep";
import uniq from "lodash/uniq";
import { flatten } from "lodash";
import { createSlug } from "@/helpers/string";

export default async function Page() {
  const allPostData = await getAllPostData();
  const postSorted = allPostData.sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
  const categoies = uniq(
    flatten(allPostData.map((post) => post.category))
  ).sort((a, b) => a.localeCompare(b));
  const tags = uniq(flatten(allPostData.map((post) => post.tag))).sort((a, b) =>
    a.localeCompare(b)
  );

  return (
    <>
      <article>
        <ul>
          {postSorted.map((post) => (
            <ul key={post.slug}>
              <Link href={`/post/${post.slug}`}>{post.title}</Link>
            </ul>
          ))}
        </ul>
      </article>
      <article>
        <h1>Category</h1>
        <ul>
          {categoies.map((categoryName) => (
            <li key={categoryName}>
              <Link href={`/category/${createSlug(categoryName)}`}>
                {categoryName}
              </Link>
            </li>
          ))}
        </ul>
      </article>
      <article>
        <h1>Tag</h1>
        <ul>
          {tags.map((tagName) => (
            <li key={tagName}>
              <Link href={`/tag/${createSlug(tagName)}`}>{tagName}</Link>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
