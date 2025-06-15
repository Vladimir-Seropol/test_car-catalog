'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function Pagination({
  currentPage,
  totalPages
}: {
  currentPage: number
  totalPages: number
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const getSearchParams = () =>
    new URLSearchParams(searchParams?.toString() || '')

  const setPage = (page: number) => {
    if (page < 1 || page > totalPages) return; 
    const params = getSearchParams()
    params.set('page', page.toString()) 
    router.push(`/?${params.toString()}`) 
  }

  const goToNext20 = () => {
   
    const nextPage = Math.min(currentPage + 20, totalPages)
    setPage(nextPage)
  }

  const goToPrev20 = () => {
    
    const prevPage = Math.max(currentPage - 20, 1)
    setPage(prevPage)
  }

  const next20Page = currentPage + 20 <= totalPages ? currentPage + 20 : totalPages;
  const prev20Page = currentPage - 20 >= 1 ? currentPage - 20 : 1;

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="w-10 h-10 flex items-center justify-center rounded-full border bg-white disabled:bg-gray-300"
      >
        &lt;
      </button>

     
      {currentPage > 20 && (
        <>
        
          <button
            onClick={goToPrev20}
            className="ml-2 px-3 h-10 flex items-center justify-center rounded-full border bg-gray-100 hover:bg-gray-200 text-sm font-medium"
          >
            {prev20Page}
          </button>
           
          {currentPage > 20 && (
            <span className="w-10 h-10 flex items-center justify-center rounded-full border bg-gray-200 text-gray-500">
              ...
            </span>
          )}     
        </>
      )}

         
      <span className="w-10 h-10 flex items-center justify-center rounded-full border bg-blue-500 text-white font-semibold">
        {currentPage}
      </span>

      
      {currentPage < totalPages - 20 && (
        <>
         
          {currentPage < totalPages - 20 && (
            <span className="w-10 h-10 flex items-center justify-center rounded-full border bg-gray-200 text-gray-500">
              ...
            </span>
          )}
          <button
            onClick={goToNext20}
            className="ml-2 px-3 h-10 flex items-center justify-center rounded-full border bg-gray-100 hover:bg-gray-200 text-sm font-medium"
          >
            {next20Page}
          </button>

        
        </>
      )}

      
      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-full border bg-white disabled:bg-gray-300"
      >
        &gt;
      </button>
    </div>
  )
}
