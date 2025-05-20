import { api } from "./base";

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
  const res = await api.get<Tag[]>("/tags", {
    params,
  });
  return res.data;
};

export const getTagDetail = async (id: number) => {
  const res = await api.get<Tag>(`/tags/${id}`);
  return res.data;
};
