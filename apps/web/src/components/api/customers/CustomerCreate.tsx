import { ReactNode } from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Customer } from '@/models';

type Props = {
  children: (params: {
    mutate: (
      data: Partial<Customer>,
      options?: {
        onSuccess?: () => void;
        onError?: (error: unknown) => void;
        onSettled?: () => void;
      },
    ) => void;
    isPending: boolean;
    error: unknown;
  }) => ReactNode;
};

export const CustomerCreate = ({ children }: Props) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: Partial<Customer>) =>
      api.post('/api/v1/customers', data),
  });

  return <>{children({ mutate, isPending, error })}</>;
};
