"use client";
import PostCard from "./PostCard";
import { useEffect, useRef, useState } from "react";
import { Box, TextField, IconButton, Spinner, Flex } from "@radix-ui/themes";
import {
  MagnifyingGlassIcon,
  CrossCircledIcon,
  DoubleArrowDownIcon,
} from "@radix-ui/react-icons";
import debounce from "lodash/debounce";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Post, PostFilterParams, PostList as PostListType } from "@/api";
import axios from "axios";
import { getDescription } from "@/helpers";

type SearchProps = {
  onSubmit: (searchValue: string) => void;
};

function Search({ onSubmit }: SearchProps) {
  const [searchTextTemp, setSearchTextTemp] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Box className="p-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(searchTextTemp);
          inputRef.current?.blur();
        }}
      >
        <TextField.Root
          placeholder="Tìm kiếm"
          value={searchTextTemp}
          onChange={(e) => setSearchTextTemp(e.target.value)}
          radius="full"
          color="indigo"
          variant="soft"
          ref={inputRef}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
          {searchTextTemp?.length > 0 && (
            <TextField.Slot>
              <IconButton
                title="Xóa"
                variant="ghost"
                type="button"
                onClick={() => {
                  setSearchTextTemp("");
                  onSubmit("");
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
  );
}

type PostListProps = {
  filter: PostFilterParams;
};

const PAGE_SIZE = 50;

async function getServerPostList(
  filter: PostFilterParams
): Promise<PostListType> {
  const result = await axios.get("/api/post", {
    params: filter,
  });
  return result.data;
}

export function PostList({ filter }: PostListProps) {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [postList, setPostList] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const loadPoint = useRef<HTMLDivElement>(null);

  async function getPosts(_filter: PostFilterParams) {
    setIsLoading(true);
    try {
      const _postList = await getServerPostList(_filter);
      setTotal(Number(_postList.total));
      setIsLoading(false);
      return _postList.items;
    } catch (error) {
      alert("Đã xảy ra lỗi, Vui lòng tải lại trang");
    } finally {
      setIsLoading(false);
    }
    return [];
  }

  async function loadMore() {
    if (postList.length >= total) {
      return;
    }
    const _filter = {
      ...filter,
      page: currentPage + 1,
      per_page: PAGE_SIZE,
    };
    if (searchText) {
      _filter.search = searchText;
    }
    const _postList = await getPosts(_filter);
    setPostList((previous) => [...previous, ..._postList]);
    setCurrentPage((previous) => previous + 1);
    return true;
  }

  function infiniteScrol() {
    const loadPointPosition = loadPoint.current?.offsetTop ?? 0;
    if (loadPointPosition < window.scrollY + window.innerHeight) {
      loadMore();
    }
  }

  useEffect(() => {
    const infiniteScrollDebounce = debounce(infiniteScrol, 500);
    document.addEventListener("scroll", infiniteScrollDebounce);
    return () => document.removeEventListener("scroll", infiniteScrollDebounce);
  }, [total, postList]);

  async function initPostList() {
    const _filter = {
      ...filter,
      page: 1,
      per_page: PAGE_SIZE,
    };
    if (searchText) {
      _filter.search = searchText;
    }
    const _postList = await getPosts(_filter);
    setPostList(_postList);
    setCurrentPage(1);
  }

  useEffect(() => {
    initPostList();
  }, [searchText]);

  return (
    <>
      <Search onSubmit={setSearchText} />
      {/* eslint-disable-next-line */}
      {/* @ts-ignore */}
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        {/* eslint-disable-next-line */}
        {/* @ts-ignore */}
        <Masonry>
          {postList.map((post) => (
            <div className="w-full p-2" key={post.id}>
              <PostCard
                key={post.id}
                title={post.title.rendered}
                slug={post.slug}
                description={getDescription(post.content.rendered)}
                html={post.content.rendered}
              />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      {isLoading && (
        <Flex justify="center">
          <Spinner />
        </Flex>
      )}
      {postList.length < total && (
        <div className="flex justify-center w-full" ref={loadPoint}>
          <DoubleArrowDownIcon className="animate-bounce text-pink-700 w-6 h-6" />
        </div>
      )}
    </>
  );
}

export default PostList;
