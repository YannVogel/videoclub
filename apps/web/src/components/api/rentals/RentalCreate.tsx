import { ReactNode } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { CreateRentalInput } from '@/models';

type Props = {
  children: (params: {
    mutate: (data: CreateRentalInput) => void;
    isPending: boolean;
    error: unknown;
  }) => ReactNode;
};

export const RentalCreate = ({ children }: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: CreateRentalInput) => api.post('/api/v1/rentals', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['rentals'] });

      await queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === 'vhs',
      });

      await queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === 'vhs' &&
          query.queryKey[1] === 'detail',
      });
    },
  });

  return <>{children({ mutate, isPending, error })}</>;
};
