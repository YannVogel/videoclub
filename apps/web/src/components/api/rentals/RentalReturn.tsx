import { ReactNode } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

type Props = {
  children: (params: {
    mutate: (rentalId: string) => void;
    isPending: boolean;
    error: unknown;
  }) => ReactNode;
};

export const RentalReturn = ({ children }: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (rentalId: string) =>
      api.patch(`/api/v1/rentals/${rentalId}/return`, {}),

    onSuccess: async (_, rentalId) => {
      // 🔁 Rafraîchit les locations (client et VHS)
      await queryClient.invalidateQueries({ queryKey: ['rentals'] });

      // 🔄 Rafraîchit toutes les listes VHS
      await queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === 'vhs',
      });

      // Optionnel : invalider la fiche VHS précise (si affichée)
      await queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === 'vhs' &&
          query.queryKey[1] === 'detail',
      });
    },
  });

  return <>{children({ mutate, isPending, error })}</>;
};
