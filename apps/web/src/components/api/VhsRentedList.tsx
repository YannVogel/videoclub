import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Vhs } from '@/models';
import React from 'react';

type Props = {
  children: (args: {
    data: Vhs[] | undefined;
    isLoading: boolean;
    error: unknown;
    refetch: () => void;
  }) => React.ReactNode;
};

export default function VhsRentedList({ children }: Props) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['vhs', 'rented'],
    queryFn: () =>
      api.get<Vhs[]>('/api/v1/vhs/rented').then((d: any) => d as Vhs[]),
  });

  return <>{children({ data, isLoading, error, refetch })}</>;
}
