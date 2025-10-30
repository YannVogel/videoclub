'use client';

import { VhsMarkLost } from '@/components/api';
import { css } from '@styled-system/css';

type Props = { vhsId: string };

const VhsMarkLostButton = ({ vhsId }: Props) => (
  <VhsMarkLost id={vhsId}>
    {({ markLost, status, error }) => (
      <div>
        <button
          onClick={() => markLost()}
          disabled={status === 'pending'}
          className={css({
            px: 4,
            py: 2,
            rounded: 'md',
            fontWeight: 'medium',
            bg: 'red.600',
            color: 'white',
            cursor: 'pointer',
            _hover: { bg: 'red.500' },
            transition: 'background-color 0.2s ease',
          })}
        >
          {status === 'pending'
            ? 'Marquage en cours…'
            : 'Déclarer comme perdue'}
        </button>

        {!!error && (
          <p
            className={css({
              color: 'red.400',
              mt: 2,
              fontSize: 'sm',
            })}
          >
            Une erreur est survenue lors du marquage.
          </p>
        )}
      </div>
    )}
  </VhsMarkLost>
);

export default VhsMarkLostButton;
