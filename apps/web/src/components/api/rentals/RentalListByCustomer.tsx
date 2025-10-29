import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Rental } from '@/models';

type Props = {
  customerId: string;
  children: (params: {
    data?: Rental[];
    isLoading: boolean;
    error: unknown;
    refetch: () => void;
  }) => ReactNode;
};

export const RentalListByCustomer = ({ customerId, children }: Props) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['rentals', 'by-customer', customerId],
    queryFn: () => api.get<Rental[]>(`/api/v1/rentals/customer/${customerId}`),
    enabled: !!customerId,
  });

  return <>{children({ data, isLoading, error, refetch })}</>;
};
