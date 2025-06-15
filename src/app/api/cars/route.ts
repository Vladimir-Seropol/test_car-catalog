export async function GET(req: Request) {
  const url = new URL(req.url);
  const search = url.searchParams.toString();
  const res = await fetch(`https://testing-api.ru-rating.ru/cars?${search}`);
  const data = await res.json();
  return Response.json(data);
}
