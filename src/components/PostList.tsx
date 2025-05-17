"use client";
import PostCard from "./PostCard";
import { useEffect, useRef, useState } from "react";
import { Box, TextField, IconButton } from "@radix-ui/themes";
import {
  MagnifyingGlassIcon,
  CrossCircledIcon,
  DoubleArrowDownIcon,
} from "@radix-ui/react-icons";
import debounce from "lodash/debounce";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Post, PostFilterParams, PostList as PostListType } from "@/api";
import clip from "@/helpers/text-clipper";
import axios from "axios";

type PostListProps = {
  filter: PostFilterParams;
};

const PAGE_SIZE = 10;

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
  const [searchTextTemp, setSearchTextTemp] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [postList, setPostList] = useState<Post[]>([]);
  const loadPoint = useRef<HTMLDivElement>(null);

  async function getPosts(_filter: PostFilterParams) {
    const _postList = await getServerPostList(_filter);
    setTotal(_postList.total);
    return _postList.items;
  }

  async function loadMore() {
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
  }, []);

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
      <Box className="p-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearchText(searchTextTemp);
          }}
        >
          <TextField.Root
            placeholder="Tìm kiếm"
            value={searchTextTemp}
            onChange={(e) => setSearchTextTemp(e.target.value)}
            radius="full"
            color="indigo"
            variant="soft"
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
                    setSearchText("");
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
          {postList.map((post) => (
            <div className="w-full p-2" key={post.id}>
              <PostCard
                key={post.id}
                title={post.title.rendered}
                slug={post.slug}
                description={clip(post.content.rendered, 500, {
                  html: true,
                  maxLines: 5,
                })}
                html={post.content.rendered}
              />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      {postList.length < total && (
        <div className="flex justify-center w-full" ref={loadPoint}>
          <DoubleArrowDownIcon className="animate-bounce text-pink-700 w-6 h-6" />
        </div>
      )}
    </>
  );
}

export default PostList;
