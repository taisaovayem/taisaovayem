import { getAllPostData } from "@/helpers";
import uniq from "lodash/uniq";
import flattenDeep from "lodash/flattenDeep";
import { createSlug } from "@/helpers/string";
import { Metadata } from "next";
import { Badge, Box, Grid, Heading } from "@radix-ui/themes";
import { PostCard } from "@/components";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<CategoryProps>;
}): Promise<Metadata> {
  const { id } = await params;
  const allPostData = await getAllPostData();
  const filterdPost = allPostData.filter((postData) =>
    postData.category
      .map((categoryName) => createSlug(categoryName))
      .includes(id)
  );
  const tagNameTitle = filterdPost[0].tag.find(
    (categoryName) => createSlug(categoryName) === id
  );
  return {
    title: "Danh mục: " + tagNameTitle,
  };
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
      <Box className="bg-gray-100 rounded-xl p-9">
        <Badge className="mb-4">Tag</Badge>
        <Heading>{categoryNameTitle}</Heading>
      </Box>
      <Box className="mb-4"></Box>
      <Grid columns="3" gap="4">
        {filterdPost.map((postData) => (
          <PostCard
            key={postData.slug}
            title={postData.title}
            slug={postData.slug}
            description={postData.description}
          />
        ))}
      </Grid>
    </>
  );
}
