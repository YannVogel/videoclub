import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Vhs } from '@/models';
import React from 'react';

type Props = {
  id: string;
  children: (args: {
    markLost: () => Promise<Vhs>;
    status: 'idle' | 'pending' | 'success' | 'error';
    error: unknown;
  }) => React.ReactNode;
};

export default function VhsMarkLost({ id, children }: Props) {
  const qc = useQueryClient();

  const mut = useMutation({
    mutationFn: () => api.patch<Vhs>(`/api/v1/vhs/${id}/lost`, {}),
    onSuccess: async (_) => {
      await qc.invalidateQueries({ queryKey: ['vhs', 'list'] });
      await qc.invalidateQueries({ queryKey: ['vhs', 'detail', id] });
    },
  });

  return (
    <>
      {children({
        markLost: mut.mutateAsync,
        status: mut.status,
        error: mut.error,
      })}
    </>
  );
}
