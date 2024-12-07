import { getPost } from "@/helpers";
import fs from "fs";
import { POST_DIRECTORY } from "@/constants";
import Link from "next/link";
import { createSlug } from "@/helpers";
import Head from "next/head";
import { Heading, Flex, Badge, Box } from "@radix-ui/themes";
import { Metadata } from "next";

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
export async function generateMetadata({
  params,
}: {
  params: Promise<PostProps>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);
  return {
    title: post.data.title,
  };
}

export default async function Post({ params }: { params: Promise<PostProps> }) {
  const { id } = await params;
  const post = await getPost(id);
  return (
    <>
      <article className="w-full mb-8">
        <Box className="bg-gray-100 rounded-xl mb-8 p-9">
          <header className="mb-6">
            <Heading>{post.data.title}</Heading>
          </header>
          <div dangerouslySetInnerHTML={{ __html: post.html }} className="text-gray-500"></div>
        </Box>
      </article>
      <article className="py-4">
        <Heading className="mb-4" as="h2" size="2">
          Danh mục
        </Heading>
        <Flex gap="2" wrap="wrap">
          {post.data.category.map((categoryName) => (
            <Badge key={categoryName} color="green">
              <Link href={`/category/${createSlug(categoryName)}`}>
                {categoryName}
              </Link>
            </Badge>
          ))}
        </Flex>
      </article>
      <article className="py-4">
        <Heading className="mb-4" as="h2" size="2">
          Tag
        </Heading>
        <Flex gap="2" wrap="wrap">
          {post.data.tag.map((tagName) => (
            <Badge key={tagName} color="pink">
              <Link href={`/tag/${createSlug(tagName)}`}>{tagName}</Link>
            </Badge>
          ))}
        </Flex>
      </article>
    </>
  );
}
