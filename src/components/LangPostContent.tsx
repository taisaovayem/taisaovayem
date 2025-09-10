"use client";
import { Box, Container } from "@radix-ui/themes";
import PostTitle from "./PostTitle";
import { Post } from "@/api";
import { replaceRoute } from "@/helpers";

type PostContentProps = {
  post: Post;
};

export function LangPostContent({ post }: PostContentProps) {
  return (
    <>
      <Box className="h-[50vh] w-full">
        <img src={post.jetpack_featured_media_url} className="h-full w-full object-cover"/>
      </Box>
      <Container size="3">
        <Box
          className="mb-8 p-4 md:p-9 relative -mt-40 bg-white dark:bg-gray-950 opacity-95 text-gray-950 dark:text-white text-lg"
        >
          {Boolean(post.title.rendered) && (
            <header className="mb-6">
              <PostTitle>{post.title.rendered}</PostTitle>
            </header>
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: replaceRoute(post.content.rendered),
            }}
            className="text-gray-950 dark:text-gray-200"
          ></div>
        </Box>
      </Container>
    </>
  );
}

export default LangPostContent;
