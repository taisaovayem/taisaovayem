import { Metadata } from "next";
import { Badge, Box, Heading } from "@radix-ui/themes";
import { NotFound, PostList } from "@/components";
import { getCategoryList } from "@/api";
import { redirect } from "next/navigation";
import { LANG_CATEGORY_ID } from "@/constants";

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

  if (!category) {
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
    title: "Chuyên mục: " + category?.name,
    description: category?.description ?? category?.name,
    openGraph: {
      title: "Chuyên mục: " + category?.name,
      description: category?.description ?? category?.name,
    },
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
  if (!category) {
    return <NotFound />;
  }
  if (category.id === LANG_CATEGORY_ID) {
    redirect("/lang")
  }

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
