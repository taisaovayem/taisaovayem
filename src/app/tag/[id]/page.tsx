import { getAllPostData } from "@/helpers";
import uniq from "lodash/uniq";
import flattenDeep from "lodash/flattenDeep";
import { createSlug } from "@/helpers/string";
import { Badge, Box, Heading, Grid, Card, Link, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import { PostList } from "@/components";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<TagProps>;
}): Promise<Metadata> {
  const { id } = await params;
  const allPostData = await getAllPostData();
  const filterdPost = allPostData.filter((postData) =>
    postData.tag.map((tagName) => createSlug(tagName)).includes(id)
  );
  const tagNameTitle = filterdPost[0].tag.find(
    (tagName) => createSlug(tagName) === id
  );
  return {
    title: "Tag: " + tagNameTitle,
  };
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
      <Box className="bg-gray-100 rounded-xl p-9">
        <Badge className="mb-4">Tag</Badge>
        <Heading>{tagNameTitle}</Heading>
      </Box>
      <Box className="mb-4"></Box>
      <PostList posts={filterdPost} />
    </>
  );
}
