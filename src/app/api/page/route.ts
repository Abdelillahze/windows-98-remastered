import searchHandler from "@/utils/searchHandler";

export async function POST(req: Request) {
  const { url } = await req.json();
  const html = await searchHandler(url);

  return new Response(html, { status: 200 });
}
