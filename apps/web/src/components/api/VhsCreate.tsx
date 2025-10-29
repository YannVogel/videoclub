import { ReactNode } from 'react';
import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Vhs } from '@/models';

type Props = {
  children: (params: {
    mutate: UseMutateFunction<
      unknown, // type de la donnée retournée (on s’en moque ici)
      Error, // type d’erreur
      Partial<Vhs>, // variables attendues (notre data)
      unknown // contexte (facultatif)
    >;
    isPending: boolean;
    error: unknown;
  }) => ReactNode;
};

const VhsCreate = ({ children }: Props) => {
  const { mutate, isPending, error } = useMutation<
    unknown,
    Error,
    Partial<Vhs>
  >({
    mutationFn: (data: Partial<Vhs>) => api.post('/api/v1/vhs', data),
  });

  return <>{children({ mutate, isPending, error })}</>;
};

export default VhsCreate;
