'use client';

import { css } from '@styled-system/css';
import { vstack } from '@styled-system/patterns';
import VhsRentedList from '@/components/api/VhsRentedList';
import VhsCard from '@/components/VhsCard';

const HomePage = () => {
  return (
    <main
      className={vstack({
        alignItems: 'flex-start',
        p: 8,
        gap: 6,
        w: 'full',
        position: 'relative',
        overflow: 'hidden',
        _before: {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(to bottom, rgba(255,255,255,0.015) 0, rgba(255,255,255,0.015) 1px, transparent 2px, transparent 3px)',
          pointerEvents: 'none',
        },
      })}
    >
      <h1
        className={css({
          fontFamily: "'Orbitron', sans-serif",
          fontSize: { base: '2xl', md: '3xl' },
          fontWeight: 'bold',
          textTransform: 'uppercase',
          background:
            'linear-gradient(90deg, #ff2e63, #66fcf1, #ffe38a, #ff2e63)',
          backgroundClip: 'text',
          color: 'transparent',
          textShadow:
            '0 0 10px rgba(255,46,99,0.4), 0 0 20px rgba(102,252,241,0.3)',
          letterSpacing: '0.05em',
        })}
      >
        🎬 Bienvenue au VidéoClub VHS
      </h1>

      <p
        className={css({
          color: 'gray.400',
          fontSize: 'lg',
          maxW: '60ch',
          lineHeight: 'taller',
        })}
      >
        Retrouvez ici un aperçu des cassettes actuellement en location.
      </p>

      <VhsRentedList>
        {({ data, isLoading, error, refetch }) => {
          if (isLoading)
            return (
              <p
                className={css({
                  color: '#66fcf1',
                  textShadow: '0 0 6px rgba(102,252,241,0.4)',
                })}
              >
                Chargement des cassettes en cours…
              </p>
            );

          if (error)
            return (
              <div
                className={vstack({
                  gap: 3,
                  alignItems: 'flex-start',
                })}
              >
                <p
                  className={css({
                    color: '#ff2e63',
                    textShadow: '0 0 6px rgba(255,46,99,0.4)',
                  })}
                >
                  Erreur : {(error as Error).message}
                </p>
                <button
                  onClick={refetch}
                  className={css({
                    px: 4,
                    py: 2,
                    rounded: 'md',
                    bg: 'rgba(255,255,255,0.08)',
                    color: '#66fcf1',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.15s ease',
                    _hover: {
                      bg: 'rgba(255,255,255,0.12)',
                      textShadow: '0 0 8px #66fcf1aa',
                    },
                  })}
                >
                  Réessayer
                </button>
              </div>
            );

          if (!data || data.length === 0)
            return (
              <p
                className={css({
                  color: 'gray.500',
                  fontStyle: 'italic',
                })}
              >
                Aucune cassette actuellement en location 🎞️
              </p>
            );

          return (
            <div
              className={css({
                display: 'grid',
                gap: 6,
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                mt: 4,
                w: 'full',
              })}
            >
              {data.map((vhs) => (
                <VhsCard key={vhs.id} vhs={vhs} />
              ))}
            </div>
          );
        }}
      </VhsRentedList>
    </main>
  );
};

export default HomePage;
