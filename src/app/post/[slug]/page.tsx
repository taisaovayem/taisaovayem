import { getThumbnail } from "@/helpers";
import Link from "next/link";
import { Heading, Flex, Badge } from "@radix-ui/themes";
import { Metadata } from "next";
import { PostContent } from "@/components";
import set from "lodash/set";
import { getPostBySlug, getCategoryList, getTagList } from "@/api"; // cập nhật lại đường dẫn nếu cần

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const thumbnail = getThumbnail(post);

  const metaData: Metadata = {
    title: post.title.rendered,
    description:
      post.content.rendered?.replace(/<[^>]+>/g, "") || post.title.rendered,
    openGraph: {
      title: post.title.rendered,
      description:
        post.content.rendered?.replace(/<[^>]+>/g, "") || post.title.rendered,
    },
  };

  if (thumbnail && thumbnail?.length) {
    set(metaData, ["openGraph", "images"], thumbnail[0]);
  }

  return metaData;
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const categories = await getCategoryList({
    include: post.categories.join(","),
  });
  const tags = await getTagList({ include: post.tags.join(",") });

  return (
    <>
      <article className="w-full">
        <PostContent post={post} />
      </article>
      <article className="py-4">
        <Heading className="mb-4" as="h2" size="2">
          Chuyên mục
        </Heading>
        <Flex gap="2" wrap="wrap">
          {categories.map((category) => (
            <Badge key={category.id} color="green">
              <Link href={`/category/${category.slug}`}>{category.name}</Link>
            </Badge>
          ))}
        </Flex>
      </article>
      <article className="py-4">
        <Heading className="mb-4" as="h2" size="2">
          Tag
        </Heading>
        <Flex gap="2" wrap="wrap">
          {tags.map((tag) => (
            <Badge key={tag.id} color="pink">
              <Link href={`/tag/${tag.slug}`}>{tag.name}</Link>
            </Badge>
          ))}
        </Flex>
      </article>
    </>
  );
}
