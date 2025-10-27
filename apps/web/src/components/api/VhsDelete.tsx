import {useMutation, useQueryClient} from "@tanstack/react-query"
import {api} from "@/lib/api"
import React from "react"

type Props = {
  id: string
  children: (args: {
    remove: () => Promise<void>
    status: "idle" | "pending" | "success" | "error"
    error: unknown
  }) => React.ReactNode
}

export default function VhsDelete({ id, children }: Props) {
  const qc = useQueryClient()
  const mut = useMutation({
    mutationFn: () => api.del(`/api/v1/vhs/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["vhs", "list"] })
      qc.removeQueries({ queryKey: ["vhs", "detail", id] })
    },
  })

  return (
    <>
      {children({
        remove: mut.mutateAsync,
        status: mut.status,
        error: mut.error,
      })}
    </>
  )
}
