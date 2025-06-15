'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

type SortOrder = 'asc' | 'desc' | 'none'

interface SortingProps {
  isLoading?: boolean
}

export default function Sorting({ isLoading = false }: SortingProps) {
  const router = useRouter()
  const rawSearchParams = useSearchParams()

  const searchParams = useMemo(() => rawSearchParams ?? new URLSearchParams(), [rawSearchParams])

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
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
    <div className="mb-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <select 
            className="p-2 border rounded appearance-none pr-8 disabled:opacity-50 disabled:cursor-not-allowed"
            onChange={handleSortChange} 
            value={currentOrder || 'none'}
            disabled={isLoading}
            aria-disabled={isLoading}
            aria-label="Сортировка автомобилей по цене"
          >
            <option value="none">Сортировка по умолчанию</option>
            <option value="asc">Сначала дешёвые</option>
            <option value="desc">Сначала дорогие</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>

        {isLoading && (
          <span className="text-sm text-gray-500">
            Применяем сортировку...
          </span>
        )}
      </div>
    </div>
  )
}