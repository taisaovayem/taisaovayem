"use client";
import { Masonry } from "react-masonry";
import PostCard, { PostCardProps } from "./PostCard";

type PostListProps = {
  posts: PostCardProps[];
};

export function PostList({ posts }: PostListProps) {
  return (
    <Masonry>
      {posts.map((post) => (
        <div className="w-1/3 p-2" key={post.slug}>
          <PostCard key={post.slug} {...post} />
        </div>
      ))}
    </Masonry>
  );
}

export default PostList;
