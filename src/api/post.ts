import { api } from "./base";

export type Post = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string; // html
  };
  categories: number[]; // category ids
  tags: number[]; // tag ids
};

export type PostList = {
  items: Post[];
  page: number;
  perPage: number;
  total: number;
};

export type PostFilterParams = {
  page?: number; // 1
  per_page?: number; // 10
  categories?: string;
  tags?: string;
  search?: string;
};

export const getPostList = async (
  params: PostFilterParams
): Promise<PostList> => {
  const res = await api.get<Post[]>("posts", {
    params,
  });
  return {
    items: res.data,
    page: res.headers["x-wp-totalpages"],
    perPage: res.headers["x-wp-per-page"],
    total: res.headers["x-wp-total"],
  };
};

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const res = await api.get<Post[]>("/posts", {
    params: {
      slug,
    },
  });
  return res.data[0];
};
