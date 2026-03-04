import { fetchAPI } from "./base";

type Category = {
  id: number;
  description: string;
  name: string;
  slug: string;
};

type FilterParams = {
  include?: string;
  per_page?: number;
  page?: number;
  slug?: string;
};

export const getCategoryList = async (
  params: FilterParams
): Promise<Category[]> => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, String(value));
    }
  });

  return fetchAPI(`/categories?${searchParams.toString()}`);
};

export const getCategoryDetail = async (
  id: number
): Promise<Category> => {
  return fetchAPI(`/categories/${id}`);
};