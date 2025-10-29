'use client';

import Link from 'next/link';
import { VhsList } from '@/components/api';
import VhsCard from '@/components/VhsCard';
import { css } from '@styled-system/css';
import { hstack } from '@styled-system/patterns';

export default function Catalog() {
  return (
    <main className={css({ p: 6 })}>
      {/* En-tête avec bouton d’ajout */}
      <div className={hstack({ justifyContent: 'space-between', mb: 6 })}>
        <h1
          className={css({
            fontSize: '3xl',
            fontWeight: 'bold',
            background:
              'linear-gradient(90deg, #ff4df0, #00e0ff, #ffe38a, #ff4df0)',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow:
              '0 0 6px rgba(255,77,240,0.35), 0 0 10px rgba(0,224,255,0.25)',
          })}
        >
          Catalogue VHS
        </h1>

        <Link
          href="/catalog/create"
          className={css({
            px: 4,
            py: 2,
            rounded: 'md',
            fontWeight: 'semibold',
            color: 'white',
            bg: 'blue.600',
            textShadow:
              '0 0 8px rgba(59,130,246,0.35), 0 0 12px rgba(59,130,246,0.25)',
            _hover: { bg: 'blue.500', transform: 'translateY(-2px)' },
            transition:
              'background 150ms ease, transform 150ms ease, box-shadow 150ms ease',
          })}
        >
          + Ajouter une VHS
        </Link>
      </div>

      <VhsList>
        {({ data, isLoading, error, refetch }) => {
          if (isLoading) return <p>Chargement…</p>;
          if (error) {
            return (
              <div className={css({ display: 'grid', gap: 3 })}>
                <p>Erreur : {(error as Error).message}</p>
                <button
                  onClick={refetch}
                  className={css({
                    alignSelf: 'start',
                    px: 3,
                    py: 2,
                    rounded: 'md',
                    bg: 'gray.800',
                    _hover: { bg: 'gray.700' },
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
                gap: 6,
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
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
