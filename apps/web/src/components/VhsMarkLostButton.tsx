'use client';

import { VhsMarkLost } from '@/components/api';
import { css } from '@styled-system/css';

type Props = { vhsId: string };

const VhsMarkLostButton = ({ vhsId }: Props) => (
  <VhsMarkLost id={vhsId}>
    {({ markLost, status, error }) => (
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 2,
        })}
      >
        <button
          onClick={() => markLost()}
          disabled={status === 'pending'}
          className={css({
            position: 'relative',
            px: 5,
            py: 2,
            rounded: 'md',
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 'wide',
            color: 'white',
            bg: 'linear-gradient(90deg, #ff2e63 0%, #ff7c9d 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow:
              '0 0 10px rgba(255,46,99,0.5), 0 0 25px rgba(255,46,99,0.3)',
            cursor: 'pointer',
            transition:
              'transform 200ms ease, filter 200ms ease, box-shadow 200ms ease',
            _hover: {
              transform: 'translateY(-2px)',
              filter: 'brightness(1.2)',
              boxShadow:
                '0 0 14px rgba(255,46,99,0.7), 0 0 35px rgba(255,46,99,0.4)',
            },
            _disabled: {
              opacity: 0.6,
              cursor: 'not-allowed',
              filter: 'grayscale(0.5)',
            },
            _after: {
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: 'md',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow:
                'inset 0 0 12px rgba(255,255,255,0.08), inset 0 0 20px rgba(255,0,85,0.2)',
              pointerEvents: 'none',
            },
          })}
        >
          {status === 'pending'
            ? '⚠️ Marquage en cours…'
            : '🛑 Déclarer perdue'}
        </button>

        {!!error && (
          <p
            className={css({
              color: '#ff2e63',
              fontSize: 'sm',
              textShadow: '0 0 6px rgba(255,46,99,0.4)',
              fontWeight: 'medium',
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
