'use client'

import { useEffect, useState } from 'react'

interface FakeFetchResult<T> {
  data: T | null
  isLoading: boolean
  error: string | null
}

export function useFakeFetch<T>(mockData: T, delayMs?: number): FakeFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error] = useState<string | null>(null)

  useEffect(() => {
    const delay = delayMs ?? Math.floor(Math.random() * 600) + 1200

    const timer = setTimeout(() => {
      setData(mockData)
      setIsLoading(false)
    }, delay)

    return () => clearTimeout(timer)
    // mockData is intentionally excluded — we only fetch once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, isLoading, error }
}
