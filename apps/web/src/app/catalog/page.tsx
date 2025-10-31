'use client';

import Link from 'next/link';
import { VhsList } from '@/components/api';
import VhsCard from '@/components/VhsCard';
import { css } from '@styled-system/css';
import { hstack } from '@styled-system/patterns';

export default function Catalog() {
  return (
    <main
      className={css({
        p: 6,
        position: 'relative',
        zIndex: 1,
      })}
    >
      {/* En-tête avec bouton d’ajout */}
      <div
        className={hstack({
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 8,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          pb: 4,
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
              '0 0 8px rgba(255,46,99,0.45), 0 0 16px rgba(102,252,241,0.4)',
            letterSpacing: '0.1em',
          })}
        >
          📼 Catalogue VHS
        </h1>

        <Link
          href="/catalog/create"
          className={css({
            px: 5,
            py: 2,
            rounded: 'md',
            fontWeight: 'semibold',
            color: 'black',
            bg: 'linear-gradient(90deg, #66fcf1 0%, #ff2e63 100%)',
            boxShadow:
              '0 0 8px rgba(102,252,241,0.4), 0 0 16px rgba(255,46,99,0.4)',
            textShadow: '0 0 6px rgba(0,0,0,0.4)',
            transition:
              'transform 150ms ease, box-shadow 200ms ease, filter 150ms ease',
            _hover: {
              transform: 'translateY(-3px)',
              filter: 'brightness(1.2)',
              boxShadow:
                '0 0 12px rgba(102,252,241,0.6), 0 0 24px rgba(255,46,99,0.5)',
            },
          })}
        >
          + Ajouter une VHS
        </Link>
      </div>

      <VhsList>
        {({ data, isLoading, error, refetch }) => {
          if (isLoading)
            return (
              <p
                className={css({
                  color: '#66fcf1',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 'md',
                  letterSpacing: 'wide',
                  textShadow: '0 0 6px rgba(102,252,241,0.5)',
                  mt: 10,
                })}
              >
                ⏳ Chargement du catalogue…
              </p>
            );

          if (error) {
            return (
              <div className={css({ display: 'grid', gap: 3, mt: 8 })}>
                <p
                  className={css({
                    color: '#ff2e63',
                    fontFamily: "'IBM Plex Mono', monospace",
                    textShadow: '0 0 6px rgba(255,46,99,0.5)',
                  })}
                >
                  ⚠️ Erreur : {(error as Error).message}
                </p>
                <button
                  onClick={refetch}
                  className={css({
                    alignSelf: 'start',
                    px: 4,
                    py: 2,
                    rounded: 'md',
                    bg: 'rgba(255,255,255,0.08)',
                    color: '#66fcf1',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontWeight: 'semibold',
                    transition: 'all 150ms ease',
                    _hover: {
                      bg: 'rgba(255,255,255,0.12)',
                      textShadow: '0 0 8px #66fcf1aa',
                      transform: 'translateY(-1px)',
                    },
                  })}
                >
                  Réessayer
                </button>
              </div>
            );
          }

          return (
            <div
              className={css({
                display: 'grid',
                gap: 8,
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                position: 'relative',
                _before: {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  background:
                    'repeating-linear-gradient(to bottom, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 2px, transparent 3px)',
                  pointerEvents: 'none',
                  zIndex: 0,
                },
              })}
            >
              {data?.map((vhs) => (
                <VhsCard key={vhs.id} vhs={vhs} />
              ))}
            </div>
          );
        }}
      </VhsList>
    </main>
  );
}
