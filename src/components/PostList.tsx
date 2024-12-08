"use client";
import { Masonry } from "react-masonry";
import PostCard, { PostCardProps } from "./PostCard";
import { ChangeEvent, useEffect, useState } from "react";
import { Box, TextField } from "@radix-ui/themes";
import { removeAccentsLetterOnly } from "@/helpers/string";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

type PostListProps = {
  posts: PostCardProps[];
};

export function PostList({ posts }: PostListProps) {
  const [searchText, setSearchText] = useState("");
  const [postList, setPostList] = useState<PostCardProps[]>(posts);

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const searchValue = event.target.value;
    setSearchText(searchValue);
    if (!searchValue) {
      setPostList(posts);
    }
    if (searchValue) {
      const result = posts.filter((post) =>
        removeAccentsLetterOnly(post.title)
          .toLocaleLowerCase()
          ?.match(removeAccentsLetterOnly(searchValue.toLocaleLowerCase()))
      );
      setPostList(result);
    }
  }

  useEffect(() => {
    setPostList(posts);
  }, [posts]);

  return (
    <>
      <Box className="p-2">
        <TextField.Root
          placeholder="Tìm kiếm"
          value={searchText}
          onChange={handleSearch}
          radius="full"
          color="indigo"
          variant="soft"
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </Box>
      <Masonry>
        {postList.map((post) => (
          <div className="w-full sm:w-1/2 lg:w-1/3 p-2" key={post.slug}>
            <PostCard key={post.slug} {...post} />
          </div>
        ))}
      </Masonry>
    </>
  );
}

export default PostList;
