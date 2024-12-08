import { getAllPostData } from "@/helpers";
import Link from "next/link";
import flattenDepth from "lodash/flatMapDeep";
import uniq from "lodash/uniq";
import { flatten } from "lodash";
import { createSlug } from "@/helpers/string";
import { Badge, Box, Flex, Grid, Heading } from "@radix-ui/themes";
import { Footer, PostList } from "@/components";
import { Metadata } from "next";
import { CommontLayout } from "@/components/CommonLayout";
export const metadata: Metadata = {
  title: "Tại sao vậy em?",
  description: "Cuộc sống em khó khăn lắm hả?",
};

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
    <CommontLayout>
      <Box className="bg-gray-100 rounded-xl mb-2 p-9">
        <Heading className="mb-4">Tai sao vậy em?</Heading>
        <Badge className="mb-4" color="pink">
          Cuộc sống của em khó khăn lắm hả?
        </Badge>
      </Box>
      <article className="mb-8 -mx-2">
        <PostList posts={postSorted} />
      </article>
      <article className="py-4">
        <Heading className="mb-4" as="h2">
          Danh mục
        </Heading>
        <Flex gap="2" wrap="wrap">
          {categoies.map((categoryName) => (
            <Badge key={categoryName} color="green">
              <Link href={`/category/${createSlug(categoryName)}`}>
                {categoryName}
              </Link>
            </Badge>
          ))}
        </Flex>
      </article>
      <article className="py-4">
        <Heading className="mb-4" as="h2">
          Tag
        </Heading>
        <Flex gap="2" wrap="wrap">
          {tags.map((tagName) => (
            <Badge key={tagName} color="pink">
              <Link href={`/tag/${createSlug(tagName)}`}>{tagName}</Link>
            </Badge>
          ))}
        </Flex>
      </article>
    </CommontLayout>
  );
}
