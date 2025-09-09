import { Metadata } from "next";
import { Box } from "@radix-ui/themes";
import { PostList } from "@/components";
import { LANG_CATEGORY_ID } from "@/constants";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Lắng",
    description: "Để cảm xúc lắng đọng",
    openGraph: {
      title: "Lắng",
      description: "Để cảm xúc lắng đọng",
    },
  };
}

export default async function Lang() {
  return (
    <>
      <Box className="-mx-2">
        <PostList filter={{ categories: LANG_CATEGORY_ID.toLocaleString() }} />
      </Box>
    </>
  );
}
