import { getAllPost } from "@/helpers";
import uniq from "lodash/uniq";
import flattenDeep from "lodash/flattenDeep";
import { createSlug } from "@/helpers/string";
import { Badge, Box, Heading } from "@radix-ui/themes";
import { Metadata } from "next";
import { PostList } from "@/components";

type TagProps = {
  id: string;
};

export async function generateStaticParams() {
  const allPostData = await getAllPost();
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

export async function generateMetadata({
  params,
}: {
  params: Promise<TagProps>;
}): Promise<Metadata> {
  const { id } = await params;
  const allPostData = await getAllPost();
  const filterdPost = allPostData.filter((postData) =>
    postData.tag.map((tagName) => createSlug(tagName)).includes(id)
  );
  const tagNameTitle = filterdPost[0].tag.find(
    (tagName) => createSlug(tagName) === id
  );
  return {
    title: "Tag: " + tagNameTitle,
    description: tagNameTitle,
  };
}

export default async function Category({
  params,
}: {
  params: Promise<TagProps>;
}) {
  const { id } = await params;
  const allPostData = await getAllPost();
  const filterdPost = allPostData.filter((postData) =>
    postData.tag.map((tagName) => createSlug(tagName)).includes(id)
  );
  const tagNameTitle = filterdPost[0].tag.find(
    (tagName) => createSlug(tagName) === id
  );
  return (
    <>
      <Box className="bg-gray-100 rounded-xl mb-2 p-9">
        <Badge className="mb-4">Tag</Badge>
        <Heading>{tagNameTitle}</Heading>
      </Box>
      <Box className="-mx-2">
        <PostList posts={filterdPost} />
      </Box>
    </>
  );
}
