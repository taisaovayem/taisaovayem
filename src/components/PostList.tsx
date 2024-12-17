"use client";
import PostCard from "./PostCard";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Box, TextField, IconButton, Spinner } from "@radix-ui/themes";
import { removeAccentsLetterOnly } from "@/helpers/string";
import { MagnifyingGlassIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { Post } from "@/helpers/post";
import debounce from "lodash/debounce";
import { useDebounce } from "@/hooks";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

type PostListProps = {
  posts: Post[];
};

const PAGE_SIZE = 10;

export function PostList({ posts }: PostListProps) {
  const [searchText, setSearchText] = useState("");
  const [postList, setPostList] = useState<Post[]>(posts);
  const [postListDisplay, setPostListDisplay] = useState<Post[]>([]);
  const [lastIndex, setLastIndex] = useState(0);
  const loadPoint = useRef<HTMLDivElement>(null);

  const postListDisplayDebouce = useDebounce(postListDisplay);

  function addLastIndex(pageSize = PAGE_SIZE) {
    setLastIndex((previousIndex) => previousIndex + pageSize);
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const searchValue = event.target.value;
    setSearchText(searchValue);
    if (!searchValue) {
      setPostList(posts);
      const _postDisplay = posts.slice(0, PAGE_SIZE);
      setPostListDisplay(_postDisplay);
      setLastIndex(_postDisplay.length - 1);
    }
    if (searchValue) {
      const result = posts.filter((post) =>
        removeAccentsLetterOnly(post.title)
          .toLocaleLowerCase()
          ?.match(removeAccentsLetterOnly(searchValue.toLocaleLowerCase()))
      );
      setPostList(result);
      const _postDisplay = result.slice(0, PAGE_SIZE);
      setPostListDisplay(_postDisplay);
      setLastIndex(_postDisplay.length - 1);
    }
  }

  function loadMore() {
    if (postList.length === postListDisplay.length) return;
    const _postNext = postList.slice(lastIndex, lastIndex + PAGE_SIZE);
    addLastIndex();
    setPostListDisplay((previousPostList) =>
      previousPostList.concat(_postNext)
    );
    return true;
  }

  function infiniteScrol() {
    const loadPointPosition = loadPoint.current?.offsetTop ?? 0;
    if (loadPointPosition < window.scrollY + window.innerHeight) {
      loadMore();
    }
  }

  useEffect(() => {
    setPostList(posts);
    setPostListDisplay(posts.slice(0, PAGE_SIZE));
    setLastIndex(posts.length >= PAGE_SIZE ? PAGE_SIZE : PAGE_SIZE - 1);
  }, [posts]);

  useEffect(() => {
    const infiniteScrollDebounce = debounce(infiniteScrol, 500);
    document.addEventListener("scroll", infiniteScrollDebounce);
    return () => document.removeEventListener("scroll", infiniteScrollDebounce);
  }, [lastIndex]);

  return (
    <>
      <Box className="p-2">
        <form onSubmit={(e) => e.preventDefault()}>
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
            {searchText?.length > 0 && (
              <TextField.Slot>
                <IconButton
                  title="Xóa"
                  variant="ghost"
                  onClick={() => {
                    setSearchText("");
                    setPostList(posts);
                    setPostListDisplay(posts);
                  }}
                  radius="full"
                >
                  <CrossCircledIcon />
                </IconButton>
              </TextField.Slot>
            )}
          </TextField.Root>
        </form>
      </Box>
      <ResponsiveMasonry>
        <Masonry>
          {postListDisplayDebouce.map((post) => (
            <div className="w-full p-2" key={post.slug}>
              <PostCard
                key={post.slug}
                title={post.title}
                slug={post.slug}
                description={post.description}
                html={post.html}
              />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <div className="flex justify-center w-full" ref={loadPoint}>
        <Spinner
          loading={postListDisplayDebouce.length < postList.length}
          size="3"
        />
      </div>
    </>
  );
}

export default PostList;
