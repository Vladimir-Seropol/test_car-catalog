// CarCard.tsx
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Car } from "@/app/types/car";

const CarCard = ({ car }: { car: Car }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = car.images.image;
  const totalImages = images.length;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md bg-white transition-transform hover:scale-[1.01] relative">
      <div onClick={nextImage} className="relative cursor-pointer">
        <Image
          src={images[currentImageIndex]}
          alt={`${car.mark_id} ${car.folder_id}`}
          width={600}
          height={400}
          className="w-full h-48 object-cover transition-opacity duration-300"
        />

        {totalImages > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentImageIndex
                    ? "bg-white shadow-[0_0_4px_rgba(0,0,0,0.5)]"
                    : "bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-4">
        <Link
          href={`/car/${car.unique_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3 className="text-lg font-semibold hover:underline cursor-pointer">
            {car.mark_cyrillic_name} {car.model_name} • {car.body_type}
          </h3>
        </Link>

        <p className="text-sm text-gray-600">
            <img src="/icon3.svg" alt="" className="inline mr-1 w-4 h-4" />
          {car.modification_id} • {car.complectation_name}
        </p>
        <p className="text-sm text-gray-600">
          <img src="/icon1.svg" alt="" className="inline mr-1 w-4 h-4" />{" "}
          {car.year} год 
          <p className="text-sm text-gray-600">
            <img src="/icon2.svg" alt="" className="inline mr-1 w-4 h-4" />
            {car.run} тыс. км 
          </p>
        </p>
        <p className="text-lg font-bold mt-2 flex items-center">
            <img src="/icon4.svg" alt="" className="inline mr-1 w-4 h-4" />
          {car.price.toLocaleString("ru-RU")} ₽
        </p>
      </div>
    </div>
  );
};

export default CarCard;
