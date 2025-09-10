import { Metadata } from "next";
import { Heading, Flex, Container } from "@radix-ui/themes";
import { LangPostList } from "@/components";
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
      <Flex className="p-4" justify="between" align="center">
        <Heading size="9" as="h1" className="text-white font-imperial-script">
          Lắng
        </Heading>
        <Heading size="2" className="text-white font-meow-script">Để cảm xúc lắng đọng</Heading>
      </Flex>
      <Container size="4" className="p-4 xl:p-0">
        <LangPostList
          filter={{ categories: LANG_CATEGORY_ID.toLocaleString() }}
        />
      </Container>
    </>
  );
}
