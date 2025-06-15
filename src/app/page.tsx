'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { fetchCars } from '@/app/lib/fetchCars'
import CarCard from '@/components/CarCard'
import Sorting from '@/components/Sorting'
import Pagination from '@/components/Pagination'
import Loading from './loading'
import { Car } from '@/app/types/car'
import '@/app/globals.css';

export default function Home() {
  const searchParams = useSearchParams()
  const [cars, setCars] = useState<Car[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const page = searchParams.get('page') || '1'
  const sort = searchParams.get('sort')
  const order = searchParams.get('order')

  useEffect(() => {
    setIsLoading(true)  
    const query = new URLSearchParams({
      _limit: '12',
      _page: page,
      ...(sort ? { _sort: 'price', _order: order || 'asc' } : {})
    }).toString()

    fetchCars(query).then(res => {
      
      if (res.data && res.meta) {
        setCars(res.data) 
        setTotalPages(res.meta.last_page)  
      } else {
        console.error('Неверная структура данных', res)
      }
      setIsLoading(false)  
    }).catch(error => {
      console.error('Ошибка при загрузке данных', error)
      setIsLoading(false)  
    })
  }, [page, sort, order])

  if (isLoading) return <Loading />  

  return (
    <main className="p-4">
      <h1>Список автомобилей</h1>
      <Sorting />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-6">
        {cars.length === 0 ? (
          <p className="text-center text-xl">Нет автомобилей для отображения</p>
        ) : (
          cars.map((car) => (
            <CarCard key={car.unique_id} car={car} />
          ))
        )}
      </div>
      <Pagination currentPage={parseInt(page)} totalPages={totalPages} />
    </main>
  )
}
