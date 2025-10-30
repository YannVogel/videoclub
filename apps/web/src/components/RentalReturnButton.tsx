'use client';

import { RentalReturn } from '@/components/api/rentals';
import { css } from '@styled-system/css';

type Props = { rentalId: string };

const RentalReturnButton = ({ rentalId }: Props) => (
  <RentalReturn>
    {({ mutate, isPending, error }) => (
      <div>
        <button
          onClick={() => mutate(rentalId)}
          disabled={isPending}
          className={css({
            px: 4,
            py: 2,
            rounded: 'md',
            fontWeight: 'medium',
            bg: 'blue.600',
            color: 'white',
            cursor: 'pointer',
            _hover: { bg: 'blue.500' },
            transition: 'background-color 0.2s ease',
          })}
        >
          {isPending ? 'Retour en cours…' : 'Retourner la cassette'}
        </button>
      </div>
    )}
  </RentalReturn>
);

export default RentalReturnButton;
