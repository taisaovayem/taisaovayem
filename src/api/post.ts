import { API_BASE, fetchAPI } from "./base";

export type Post = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  categories: number[];
  tags: number[];
  excerpt: {
    rendered: string;
  };
  jetpack_featured_media_url: string;
};

export type PostList = {
  items: Post[];
  page: number;
  perPage: number;
  total: number;
};

export type PostFilterParams = {
  page?: number;
  per_page?: number;
  categories?: string;
  tags?: string;
  search?: string;
};

export const getPostList = async (
  params: PostFilterParams
): Promise<PostList> => {
  const res = await fetch(`${API_BASE}/posts?${params.toString()}`, {
    next: {
      revalidate: 60 * 60 * 24,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data: Post[] = await res.json();

  return {
    items: data,
    page: Number(res.headers.get("x-wp-totalpages")),
    perPage: Number(res.headers.get("x-wp-per-page")),
    total: Number(res.headers.get("x-wp-total")),
  };
};

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const data = await fetchAPI<Post[]>(`/posts?slug=${slug}`);
  return data[0];
};