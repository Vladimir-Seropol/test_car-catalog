'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

type SortOrder = 'asc' | 'desc' | 'none'

export default function Sorting() {
  const router = useRouter()
  const rawSearchParams = useSearchParams()
  
  
  const searchParams = useMemo(() => {
    return rawSearchParams ?? new URLSearchParams()
  }, [rawSearchParams])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortOrder
    const params = new URLSearchParams(searchParams.toString())
    
    if (value === 'none') {
      params.delete('sort')
      params.delete('order')
    } else {
      params.set('sort', 'price')
      params.set('order', value)
    }
    
    router.push(`/?${params.toString()}`, { scroll: false })
  }, [router, searchParams]) 

  const currentOrder = searchParams.get('order') as SortOrder | null

  return (
    <select 
      className="p-2 border rounded" 
      onChange={handleChange} 
      defaultValue={currentOrder || 'none'}
      aria-label="Сортировка автомобилей"
    >
      <option value="none">Сортировка по умолчанию</option>
      <option value="asc">Сначала дешёвые</option>
      <option value="desc">Сначала дорогие</option>
    </select>
  )
}