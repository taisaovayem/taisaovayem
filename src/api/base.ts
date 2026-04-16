export const API_BASE =
  process.env.API ?? "http://taisaovayem-api:80/wp-json/wp/v2";

export async function fetchAPI<T>(
  path: string
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
      next: {
        revalidate: 60 * 60 * 24,
      },
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch API data");
    }
  
    return res.json();
}