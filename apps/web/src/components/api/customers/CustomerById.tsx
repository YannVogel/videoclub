'use client';

import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Customer } from '@/models';

type Props = {
  id: string;
  children: (params: {
    data?: Customer;
    isLoading: boolean;
    error: unknown;
    refetch: () => void;
  }) => ReactNode;
};

export const CustomerById = ({ id, children }: Props) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['customers', id],
    queryFn: () => api.get<Customer>(`/api/v1/customers/${id}`),
  });

  return <>{children({ data, isLoading, error, refetch })}</>;
};
