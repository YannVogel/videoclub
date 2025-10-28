import { ReactNode } from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';

type Props = {
  id: string;
  children: (params: {
    mutate: () => void;
    isPending: boolean;
    error: unknown;
  }) => ReactNode;
};

export const CustomerDelete = ({ id, children }: Props) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: () => api.del(`/api/v1/customers/${id}`),
  });

  return <>{children({ mutate, isPending, error })}</>;
};
