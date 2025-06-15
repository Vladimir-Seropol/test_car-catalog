export async function fetchCars(query: string, { signal }: { signal: AbortSignal }) {
  const res = await fetch(`/api/cars?${query}`, { signal });
  if (!res.ok) throw new Error("Failed to fetch cars");
  return res.json();
}