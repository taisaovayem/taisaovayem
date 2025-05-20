import { Metadata } from "next";
import { Badge, Box, Heading } from "@radix-ui/themes";
import { PostList } from "@/components";
import { getCategoryList } from "@/api";

type CategoryProps = {
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<CategoryProps>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategoryList({
    slug,
  });
  const category = categories[0];

  return {
    title: "Chuyên mục: " + category?.name,
    description: category?.description ?? category?.name,
  };
}

export default async function Category({
  params,
}: {
  params: Promise<CategoryProps>;
}) {
  const { slug } = await params;
  const categories = await getCategoryList({
    slug,
  });
  const category = categories[0];

  return (
    <>
      <Box
        className=" rounded-xl mb-2 p-4 md:p-9"
        style={{ background: "var(--gray-a3)" }}
      >
        <Badge className="mb-4">Chuyên mục</Badge>
        <Heading>{category.name}</Heading>
      </Box>
      <Box className="-mx-2">
        <PostList filter={{ categories: category.id.toLocaleString() }} />
      </Box>
    </>
  );
}
