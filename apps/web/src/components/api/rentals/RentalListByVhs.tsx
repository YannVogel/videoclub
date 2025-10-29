import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Rental } from '@/models';

type Props = {
  vhsId: string;
  children: (params: {
    data?: Rental[];
    isLoading: boolean;
    error: unknown;
    refetch: () => void;
  }) => ReactNode;
};

export const RentalListByVhs = ({ vhsId, children }: Props) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['rentals', 'by-vhs', vhsId],
    queryFn: () => api.get<Rental[]>(`/api/v1/rentals/vhs/${vhsId}`),
    enabled: !!vhsId,
  });

  return <>{children({ data, isLoading, error, refetch })}</>;
};
