import { searchDishes } from "../../lib/store";

export async function GET(request) {
  const category = request.nextUrl.searchParams.get("category");
  const q = request.nextUrl.searchParams.get("q");
  return Response.json({ dishes: searchDishes(category, q) });
}