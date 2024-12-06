import { getAllPostData } from "@/helpers";
import uniq from "lodash/uniq";
import flattenDeep from "lodash/flattenDeep";
import { createSlug } from "@/helpers/string";
import Link from "next/link";

type CategoryProps = {
  id: string;
};

export async function generateStaticParams() {
  const allPostData = await getAllPostData();
  const slugList: string[] = uniq(
    flattenDeep(
      allPostData.map((postData) =>
        postData.category.map((categoryName) => createSlug(categoryName))
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
  params: Promise<CategoryProps>;
}) {
  const { id } = await params;
  const allPostData = await getAllPostData();
  const filterdPost = allPostData.filter((postData) =>
    postData.category
      .map((categoryName) => createSlug(categoryName))
      .includes(id)
  );
  const categoryNameTitle = filterdPost[0].category.find(
    (categoryName) => createSlug(categoryName) === id
  );
  return (
    <>
      <h1>{categoryNameTitle}</h1>
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
