export async function fetchCars(query: string) {
  const res = await fetch(`/api/cars?${query}`);
  if (!res.ok) throw new Error("Failed to fetch cars");
  return res.json();
}
