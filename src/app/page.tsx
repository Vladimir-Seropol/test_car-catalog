'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { fetchCars } from '@/app/lib/fetchCars'
import CarCard from '@/components/CarCard'
import Sorting from '@/components/Sorting'
import Pagination from '@/components/Pagination'
import Loading from './loading'
import { Car } from '@/app/types/car'
import '@/app/globals.css'

export default function Home() {
  const searchParams = useSearchParams()
  const [, setCars] = useState<Car[]>([])
  const [visibleCars, setVisibleCars] = useState<Car[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isFetchingMore, setIsFetchingMore] = useState(false)

  const page = searchParams.get('page') || '1'
  const sort = searchParams.get('sort')
  const order = searchParams.get('order')

  
  useEffect(() => {
    const abortController = new AbortController()
    
    setIsLoading(true)
    const query = new URLSearchParams({
      _limit: '12',
      _page: page,
      ...(sort ? { _sort: 'price', _order: order || 'asc' } : {})
    }).toString()

    fetchCars(query, { signal: abortController.signal })
      .then(res => {
        if (res.data && res.meta) {
          setCars(res.data)
          setTotalPages(res.meta.last_page)
          
         
          setVisibleCars([])
          setIsFetchingMore(true)
          
          setTimeout(() => {
            setVisibleCars(res.data.slice(0, 4))
            
            setTimeout(() => {
              setVisibleCars(res.data.slice(0, 8))
              
              setTimeout(() => {
                setVisibleCars(res.data)
                setIsFetchingMore(false)
              }, 300)
            }, 300)
          }, 300)
        }
        setIsLoading(false)
      })
      .catch(error => {
        if (error.name !== 'AbortError') {
          console.error('Ошибка при загрузке данных', error)
          setIsLoading(false)
        }
      })

    return () => abortController.abort()
  }, [page, sort, order])

  if (isLoading) return <Loading />

  return (
    <main className="p-4">
      <h1>Список автомобилей</h1>
      <Sorting isLoading={isFetchingMore} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-6">
        {visibleCars.length === 0 && !isFetchingMore ? (
          <p className="text-center text-xl col-span-full">Нет автомобилей для отображения</p>
        ) : (
          visibleCars.map((car) => (
            <CarCard key={`${car.unique_id}_${page}`} car={car} />
          ))
        )}
      </div>
      
      {isFetchingMore && (
        <div className="text-center py-4">
          <span className="inline-block animate-pulse">Загружаем автомобили...</span>
        </div>
      )}
      
      <Pagination currentPage={parseInt(page)} totalPages={totalPages} />
    </main>
  )
}