import { getPostList, PostFilterParams } from "../../../api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postList = await getPostList(
    searchParams as unknown as PostFilterParams
  );
  return new Response(JSON.stringify(postList), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
