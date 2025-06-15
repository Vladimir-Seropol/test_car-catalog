/* eslint-disable @typescript-eslint/no-explicit-any */

'use server'

import { notFound } from "next/navigation";
import CarDetailClient from "./CarDetailClient";

export async function generateStaticParams() {
  try {
    const res = await fetch("https://testing-api.ru-rating.ru/cars");
    const data = await res.json();
    return data.data.map((car: any) => ({
      id: car.unique_id.toString(),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}


export default async function CarPage(props: any) {
  const id = props.params?.id;
  const carId = parseInt(id, 10);
  
  if (!id || isNaN(carId)) notFound();

  try {
    const res = await fetch(`https://testing-api.ru-rating.ru/cars/${carId}`);
    const data = await res.json();
    
    if (!data?.data?.length) notFound();
    
    return <CarDetailClient car={data.data[0]} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}