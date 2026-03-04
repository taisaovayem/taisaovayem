import { fetchAPI } from "./base";

type Tag = {
  id: number;
  description: string;
  name: string;
  slug: string;
};

type FilterParams = {
  include?: string; // 3,7,10 lấy theo danh sách id
  per_page?: number; // 100
  page?: number; // 1
  slug?: string;
};

export const getTagList = async (params: FilterParams) => {
  return fetchAPI<Tag[]>(`/tags?${new URLSearchParams(params as Record<string, string>).toString()}`);
};

export const getTagDetail = async (id: number) => {
  return fetchAPI<Tag>(`/tags/${id}`);
};
