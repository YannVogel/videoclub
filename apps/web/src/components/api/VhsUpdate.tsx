import {useMutation, useQueryClient} from "@tanstack/react-query"
import {api} from "@/lib/api"
import type {UpdateVhsInput, Vhs} from "@/models"
import React from "react"

type Props = {
  id: string
  children: (args: {
    update: (payload: Omit<UpdateVhsInput, "id">) => Promise<Vhs>
    status: "idle" | "pending" | "success" | "error"
    error: unknown
  }) => React.ReactNode
}

export default function VhsUpdate({ id, children }: Props) {
  const qc = useQueryClient()
  const mut = useMutation({
    mutationFn: (payload: Omit<UpdateVhsInput, "id">) =>
      api.patch<Vhs>(`/api/v1/vhs/${id}`, payload),
    onSuccess: (vhs) => {
      qc.invalidateQueries({ queryKey: ["vhs", "list"] })
      qc.invalidateQueries({ queryKey: ["vhs", "detail", id] })
    },
  })

  return (
    <>
      {children({
        update: mut.mutateAsync,
        status: mut.status,
        error: mut.error,
      })}
    </>
  )
}
