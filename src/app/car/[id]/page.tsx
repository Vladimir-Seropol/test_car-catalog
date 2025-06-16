import { notFound } from 'next/navigation';
import CarDetailClient from './CarDetailClient';
import type { Metadata } from 'next';
import type { CarData, CarsResponse } from '../../types/car';


const fetchCar = async (id: number) => {
  const res = await fetch(`https://testing-api.ru-rating.ru/cars/${id}`, {
    next: { revalidate: 3600, tags: [`car-${id}`] }
  });
  if (!res.ok) throw new Error('Car fetch failed');
  return res.json() as Promise<{ data: CarData[] }>;
};

export async function generateStaticParams() {
  try {
    const res = await fetch('https://testing-api.ru-rating.ru/cars', {
      next: { revalidate: 86400 } 
    });
    const data: CarsResponse = await res.json();
    return data.data.map(car => ({ id: car.unique_id.toString() }));
  } catch (error) {
    console.error('Static params error:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) return {};

  try {
    const { data } = await fetchCar(id);
    const car = data[0];
    if (!car) return {};

    return {
      title: `${car.mark_cyrillic_name} ${car.model_name} (${car.year})`,
      description: `${car.mark_cyrillic_name} ${car.model_name} ${car.year} года - ${car.price.toLocaleString('ru-RU')} ₽`,
      openGraph: {
        images: car.images.image[0] ? [car.images.image[0]] : [],
      },
    };
  } catch {
    return {};
  }
}

export default async function CarPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) notFound();

  try {
    const { data } = await fetchCar(id);
    const car = data[0];
    if (!car) notFound();

    return <CarDetailClient car={car} />;
  } catch (error) {
    console.error('Car page error:', error);
    notFound();
  }
}