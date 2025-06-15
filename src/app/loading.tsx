'use client'

import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80">
      <div className="animate-spin-slow mb-4">
        <Image
                  //   src="/car-loading.gif"
                  alt="Loading"
                  width={100}
                  height={100} src={""}        />
      </div>
      <p className="text-xl text-gray-500">Загрузка...</p>
    </div>
  );
}
