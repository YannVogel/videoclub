import { ReactNode } from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Customer } from '@/models';

type Props = {
  id: string;
  children: (params: {
    mutate: (data: Partial<Customer>) => void;
    isPending: boolean;
    error: unknown;
  }) => ReactNode;
};

export const CustomerUpdate = ({ id, children }: Props) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: Partial<Customer>) =>
      api.patch(`/api/v1/customers/${id}`, data),
  });

  return <>{children({ mutate, isPending, error })}</>;
};
