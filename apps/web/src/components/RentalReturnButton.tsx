'use client';

import { RentalReturn } from '@/components/api/rentals';
import { css } from '@styled-system/css';

type Props = { rentalId: string };

const RentalReturnButton = ({ rentalId }: Props) => (
  <RentalReturn>
    {({ mutate, isPending, error }) => (
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        })}
      >
        <button
          onClick={() => mutate(rentalId)}
          disabled={isPending}
          className={css({
            position: 'relative',
            px: 5,
            py: 2,
            rounded: 'md',
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 'wide',
            color: 'black',
            bg: 'linear-gradient(90deg, #00e0ff 0%, #66fcf1 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow:
              '0 0 10px rgba(102,252,241,0.5), 0 0 25px rgba(102,252,241,0.3)',
            cursor: 'pointer',
            transition:
              'transform 200ms ease, filter 200ms ease, box-shadow 200ms ease',
            _hover: {
              transform: 'translateY(-2px)',
              filter: 'brightness(1.15)',
              boxShadow:
                '0 0 15px rgba(102,252,241,0.6), 0 0 35px rgba(102,252,241,0.4)',
            },
            _disabled: {
              opacity: 0.6,
              cursor: 'not-allowed',
              filter: 'grayscale(0.6)',
            },
            _after: {
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: 'md',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow:
                'inset 0 0 10px rgba(255,255,255,0.08), inset 0 0 16px rgba(0,255,255,0.15)',
              pointerEvents: 'none',
            },
          })}
        >
          {isPending ? '⏳ Retour en cours…' : '⏏️ Retourner la cassette'}
        </button>

        {!!error && (
          <p
            className={css({
              color: '#ff2e63',
              fontSize: 'sm',
              fontWeight: 'medium',
              textShadow: '0 0 6px rgba(255,46,99,0.4)',
            })}
          >
            ⚠️ Erreur lors du retour de la cassette.
          </p>
        )}
      </div>
    )}
  </RentalReturn>
);

export default RentalReturnButton;
