'use client';

import { VhsById } from '@/components/api';
import { statusBadge } from '@/styles/statusBadge';
import { statusLabel } from '@/utils';
import { css, cva } from '@styled-system/css';
import { hstack, vstack } from '@styled-system/patterns';
import { VhsStatusEnum } from '@/models';

type Props = { id: string };

const glowingBorder = cva({
  base: {
    position: 'relative',
    rounded: 'xl',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'gray.800',
    bg: 'black',
    boxShadow: '0 0 10px rgba(255,0,255,0.15), 0 0 20px rgba(0,200,255,0.08)',
    transition: 'transform 300ms ease, box-shadow 300ms ease',
    _hover: {
      transform: 'scale(1.02)',
      boxShadow:
        '0 0 15px rgba(255,77,240,0.35), 0 0 25px rgba(0,224,255,0.25)',
    },
  },
});

const glowingTitle = css({
  fontSize: { base: '2xl', md: '3xl' },
  fontWeight: 'bold',
  background: 'linear-gradient(90deg, #ff4df0, #00e0ff, #ffe38a, #ff4df0)',
  backgroundClip: 'text',
  color: 'transparent',
  textShadow: '0 0 8px rgba(255,77,240,0.35), 0 0 12px rgba(0,224,255,0.25)',
});

const VhsDetails = ({ id }: Props) => {
  return (
    <VhsById id={id}>
      {({ data, isLoading, error, refetch }) => {
        if (isLoading) return <p>Chargement…</p>;
        if (error)
          return (
            <div className={vstack({ gap: 3, alignItems: 'flex-start' })}>
              <p>Erreur : {(error as Error).message}</p>
              <button
                onClick={refetch}
                className={css({
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
        if (!data) return <p>Introuvable.</p>;

        return (
          <section
            className={hstack({
              alignItems: 'flex-start',
              gap: 10,
              flexWrap: 'wrap',
              w: 'full',
              p: 4,
              borderRadius: '2xl',
              bg: 'linear-gradient(to-b, rgba(255,255,255,0.03), transparent)',
            })}
          >
            {/* Jaquette */}
            <div className={glowingBorder()}>
              <img
                src={data.coverUrl}
                alt={data.title}
                className={css({
                  display: 'block',
                  w: '300px',
                  h: '450px',
                  objectFit: 'cover',
                  filter: 'saturate(1.05) contrast(1.05)',
                  transition: 'transform 250ms ease',
                })}
              />
              <span className={statusBadge({ status: data.status })}>
                {statusLabel[data.status]}
              </span>
            </div>

            {/* Détails */}
            <div
              className={vstack({
                gap: 5,
                alignItems: 'flex-start',
                flex: 1,
                color: 'gray.100',
              })}
            >
              <header
                className={vstack({
                  alignItems: 'flex-start',
                  gap: 2,
                })}
              >
                <h1 className={glowingTitle}>{data.title}</h1>

                {data.year && (
                  <p className={css({ color: 'gray.400', fontSize: 'sm' })}>
                    Sortie en {data.year}
                  </p>
                )}

                {data.genres?.length > 0 && (
                  <div className={hstack({ gap: 2, flexWrap: 'wrap' })}>
                    {data.genres.map((g) => (
                      <span
                        key={g}
                        className={css({
                          fontSize: 'xs',
                          px: 2,
                          py: 1,
                          rounded: 'full',
                          borderWidth: 1,
                          borderColor: 'gray.700',
                          color: 'gray.200',
                          bg: 'gray.800',
                        })}
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {/* Barre séparatrice */}
              <div
                className={css({
                  w: '100%',
                  h: '1px',
                  bg: 'linear-gradient(90deg, #ff4df0, #00e0ff, #ffe38a)',
                  opacity: 0.3,
                })}
              />

              {/* Synopsis */}
              {data.synopsis && (
                <p
                  className={css({
                    color: 'gray.200',
                    fontSize: 'md',
                    maxW: '70ch',
                    lineHeight: 'taller',
                    textAlign: 'justify',
                    textIndent: '1.5em',
                    letterSpacing: '0.01em',
                  })}
                >
                  {data.synopsis}
                </p>
              )}

              {/* Actions */}
              <div className={hstack({ gap: 3, pt: 2 })}>
                {data.status === VhsStatusEnum.enum.available && (
                  <button
                    className={css({
                      px: 5,
                      py: 2,
                      rounded: 'md',
                      fontWeight: 'semibold',
                      bg: 'green.600',
                      color: 'white',
                      textShadow:
                        '0 0 8px rgba(34,197,94,0.25), 0 0 15px rgba(34,197,94,0.25)',
                      _hover: {
                        bg: 'green.500',
                        transform: 'translateY(-2px)',
                      },
                      transition:
                        'background 150ms ease, transform 150ms ease, box-shadow 150ms ease',
                    })}
                  >
                    Enregistrer une location
                  </button>
                )}

                {(data.status === VhsStatusEnum.enum.rented ||
                  data.status === VhsStatusEnum.enum.overdue) && (
                  <button
                    className={css({
                      px: 5,
                      py: 2,
                      rounded: 'md',
                      fontWeight: 'semibold',
                      bg: 'blue.600',
                      color: 'white',
                      textShadow:
                        '0 0 8px rgba(59,130,246,0.25), 0 0 15px rgba(59,130,246,0.25)',
                      _hover: {
                        bg: 'blue.500',
                        transform: 'translateY(-2px)',
                      },
                      transition:
                        'background 150ms ease, transform 150ms ease, box-shadow 150ms ease',
                    })}
                  >
                    Enregistrer un retour
                  </button>
                )}

                {data.status === VhsStatusEnum.enum.lost && (
                  <span
                    className={css({
                      color: 'red.400',
                      fontStyle: 'italic',
                      fontSize: 'sm',
                    })}
                  >
                    Cassette perdue — non disponible
                  </span>
                )}
              </div>
            </div>
          </section>
        );
      }}
    </VhsById>
  );
};

export default VhsDetails;
