import {useQuery} from "@tanstack/react-query"
import {api} from "@/lib/api"
import type {Vhs} from "@/models"
import React from "react"

type Props = {
  filters?: { status?: string; genre?: string; q?: string }
  children: (args: {
    data: Vhs[] | undefined
    isLoading: boolean
    error: unknown
    refetch: () => void
  }) => React.ReactNode
}

export default function VhsList({ filters, children }: Props) {
  const qs = new URLSearchParams(
    Object.entries(filters ?? {}).filter(([, v]) => v != null && v !== "")
  ).toString()
  const path = `/api/v1/vhs${qs ? `?${qs}` : ""}`

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["vhs", "list", filters],
    queryFn: () => api.get<Vhs>(path).then((d: any) => d as Vhs[]),
  })

  return <>{children({ data, isLoading, error, refetch })}</>
}
