import {useMutation, useQueryClient} from "@tanstack/react-query"
import {api} from "@/lib/api"
import type {CreateVhsInput, Vhs} from "@/models"
import React from "react"

type Props = {
  children: (args: {
    create: (payload: CreateVhsInput) => Promise<Vhs>
    status: "idle" | "pending" | "success" | "error"
    error: unknown
  }) => React.ReactNode
}

export default function VhsCreate({ children }: Props) {
  const qc = useQueryClient()
  const mut = useMutation({
    mutationFn: (payload: CreateVhsInput) => api.post<Vhs>("/api/v1/vhs", payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["vhs", "list"] })
    },
  })

  return (
    <>
      {children({
        create: mut.mutateAsync,
        status: mut.status,
        error: mut.error,
      })}
    </>
  )
}
