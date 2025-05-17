import { api } from "./base";

type Category = {
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

export const getCategoryList = async (params: FilterParams) => {
  const res = await api.get<Category[]>("/categories", {
    params,
  });
  return res.data;
};

export const getCategoryDetail = async (id: number) => {
  const res = await api.get<Category>(`/categories/${id}`);
  return res.data;
};
