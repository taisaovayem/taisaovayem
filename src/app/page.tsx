import { getCategoryList, getTagList } from "../api";
import Link from "next/link";
import { Badge, Box, Flex, Heading } from "@radix-ui/themes";
import { PostList } from "@/components";
import { Metadata } from "next";
import { CommontLayout } from "@/components/CommonLayout";
export const metadata: Metadata = {
  title: "Tại sao vậy em?",
  description: "Cuộc sống em khó khăn lắm hả?",
};

export default async function Page() {
  const allCategoryData = await getCategoryList({});
  const allTagData = await getTagList({});

  return (
    <CommontLayout>
      <Box
        className=" rounded-xl mb-2 p-4 md:p-9"
        style={{ background: "var(--gray-a3)" }}
      >
        <Heading className="mb-4">Tại sao vậy em?</Heading>
        <Badge className="mb-4" color="pink">
          Cuộc sống của em khó khăn lắm hả?
        </Badge>
      </Box>
      <article className="mb-8 -mx-2">
        <PostList filter={{}} />
      </article>
      <article className="py-4">
        <Heading className="mb-4" as="h2">
          Chuyên mục
        </Heading>
        <Flex gap="2" wrap="wrap">
          {allCategoryData.map((category) => (
            <Badge key={category.id} color="green">
              <Link href={`/category/${category.slug}`}>{category.name}</Link>
            </Badge>
          ))}
        </Flex>
      </article>
      <article className="py-4">
        <Heading className="mb-4" as="h2">
          Tag
        </Heading>
        <Flex gap="2" wrap="wrap">
          {allTagData.map((tag) => (
            <Badge key={tag.id} color="pink">
              <Link href={`/tag/${tag.slug}`}>{tag.name}</Link>
            </Badge>
          ))}
        </Flex>
      </article>
    </CommontLayout>
  );
}
