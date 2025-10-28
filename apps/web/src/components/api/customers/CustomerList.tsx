import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Customer } from '@/models';

type Props = {
  children: (params: {
    data?: Customer[];
    isLoading: boolean;
    error: unknown;
    refetch: () => void;
  }) => ReactNode;
};

export const CustomerList = ({ children }: Props) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['customers', 'list'],
    queryFn: () => api.get<Customer[]>('/api/v1/customers'),
  });

  return <>{children({ data, isLoading, error, refetch })}</>;
};
