"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { CarData } from "@/app/types/car";
import Loading from "../../loading";


function DetailItem({ label, value }: { label: string; value: string | number }) {
  return (
    <p>
      <span className="font-semibold text-gray-700">{label}:</span>{' '}
      <span className="text-gray-900">{value}</span>
    </p>
  );
}

export default function CarDetailClient({ car }: { car: CarData }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    new Array(car.images.image.length).fill(false)
  );

  const handleImageClick = useCallback((img: string) => {
    setSelectedImage(img);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  }, []);

  const allImagesLoaded = loadedImages.every(Boolean);
  const priceFormatted = new Intl.NumberFormat('ru-RU').format(car.price);
  const runFormatted = new Intl.NumberFormat('ru-RU').format(car.run);

  return (
    <div className="relative max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {!allImagesLoaded && (
        <div className="absolute inset-0 z-50 bg-white/80 flex items-center justify-center">
          <Loading />
        </div>
      )}

      <div className="text-center mb-6">
        <h1>
          {car.mark_cyrillic_name} {car.model_name}
        </h1>
        <p className="text-lg text-gray-600">{car.modification_id}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <DetailItem label="Тип кузова" value={car.body_type} />
          <DetailItem label="Руль" value={car.wheel} />
          <DetailItem label="Цвет" value={car.color} />
          <DetailItem label="Состояние" value={car.state} />
          <DetailItem label="Пробег" value={`${runFormatted} км`} />
          <DetailItem label="Владельцев" value={car.owners_number} />
        </div>
        <div className="space-y-2">
          <DetailItem label="Год выпуска" value={car.year} />
          <DetailItem label="Цена" value={`${priceFormatted} ${car.currency}`} />
          <DetailItem 
            label="Двигатель" 
            value={`${car.engine_volume} см³, ${car.engine_power} (${car.engine_type})`} 
          />
          <DetailItem label="КПП" value={car.gearbox} />
          <DetailItem label="Привод" value={car.drive} />
          <DetailItem label="ПТС" value={car.pts} />
        </div>
      </div>

      {car.extras && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Особенности:</h3>
          <div className="flex flex-wrap gap-2">
            {car.extras.split(', ').map((extra, i) => (
              <span 
                key={i}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {extra.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Фотографии ({car.images.image.length})</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {car.images.image.map((img, index) => (
            <div
              key={`${car.unique_id}-${index}`}
              className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleImageClick(img)}
            >
              <Image
                src={img}
                alt={`${car.mark_cyrillic_name} ${car.model_name} - фото ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
                onLoadingComplete={() => handleImageLoad(index)}
                priority={index < 4}
              />
            </div>
          ))}
        </div>
      </section>

      {selectedImage && (
  <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
    <div className="relative max-w-5xl w-full max-h-[90vh]">
      <button
        onClick={handleCloseModal}
        className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors z-10"
        aria-label="Закрыть"
      >
        <span className="text-3xl">×</span>
      </button>
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={selectedImage}
          alt="Увеличенное изображение автомобиля"
          width={1200}
          height={800}
          className="object-contain max-w-full max-h-full"
          quality={100}
          priority
        />
      </div>
    </div>
  </div>
)}
    </div>
  );
}