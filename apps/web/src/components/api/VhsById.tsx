import {useQuery} from "@tanstack/react-query"
import {api} from "@/lib/api"
import type {Vhs} from "@/models"
import React from "react"

type Props = {
  id: string
  children: (args: {
    data: Vhs | undefined
    isLoading: boolean
    error: unknown
    refetch: () => void
  }) => React.ReactNode
}

export default function VhsById({ id, children }: Props) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["vhs", "detail", id],
    queryFn: () => api.get<Vhs>(`/api/v1/vhs/${id}`),
    enabled: !!id,
  })

  return <>{children({ data, isLoading, error, refetch })}</>
}
