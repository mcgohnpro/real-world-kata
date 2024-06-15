/* eslint-disable import/prefer-default-export */
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}
