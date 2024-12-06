import { getAllPostData } from "@/helpers";
import uniq from "lodash/uniq";
import flattenDeep from "lodash/flattenDeep";
import { createSlug } from "@/helpers/string";
import Link from "next/link";

type TagProps = {
  id: string;
};

export async function generateStaticParams() {
  const allPostData = await getAllPostData();
  const slugList: string[] = uniq(
    flattenDeep(
      allPostData.map((postData) =>
        postData.tag.map((tagName) => createSlug(tagName))
      )
    )
  );
  return slugList.map((slug) => ({
    id: slug,
  }));
}

export default async function Category({
  params,
}: {
  params: Promise<TagProps>;
}) {
  const { id } = await params;
  const allPostData = await getAllPostData();
  const filterdPost = allPostData.filter((postData) =>
    postData.tag.map((tagName) => createSlug(tagName)).includes(id)
  );
  const tagNameTitle = filterdPost[0].tag.find(
    (tagName) => createSlug(tagName) === id
  );
  return (
    <>
      <h1>{tagNameTitle}</h1>
      <ul>
        {filterdPost.map((postData) => (
          <li key={postData.slug}>
            <Link href={`/post/${postData.slug}`}>{postData.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
