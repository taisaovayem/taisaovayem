import { Badge, Box, Heading } from "@radix-ui/themes";
import { Metadata } from "next";
import { PostList, NotFound } from "@/components";
import { getTagList } from "@/api";

type TagProps = {
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<TagProps>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tags = await getTagList({ slug });
  const tag = tags[0];
  if (!tag) {
    return {
      title: "Oh oh! Trang bạn truy cập không tồn tại rồi",
      description: "Trang bạn yêu cầu hiện không có rùi!",
      openGraph: {
        title: "Oh oh! Trang bạn truy cập không tồn tại rồi",
        description: "Trang bạn yêu cầu hiện không có rùi!",
        images: "/404.jpg",
      },
    };
  }
  return {
    title: "Tag: " + tag?.name,
    description: tag?.description ?? tag?.name,
  };
}

export default async function Category({
  params,
}: {
  params: Promise<TagProps>;
}) {
  const { slug } = await params;
  const tags = await getTagList({ slug });
  const tag = tags[0];
  if (!tag) {
    return <NotFound />;
  }
  return (
    <>
      <Box
        className=" rounded-xl mb-2 p-4 md:p-9"
        style={{ background: "var(--gray-a3)" }}
      >
        <Badge className="mb-4">Tag</Badge>
        <Heading>{tag.name}</Heading>
      </Box>
      <Box className="-mx-2">
        <PostList filter={{ tags: tag.id.toString() }} />
      </Box>
    </>
  );
}
