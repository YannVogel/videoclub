import { ReactNode } from 'react';
import { useMutation } from '@tanstack/react-query';
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
  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: CreateRentalInput) => api.post('/api/v1/rentals', data),
  });

  return <>{children({ mutate, isPending, error })}</>;
};
