'use client';

import { VhsById } from '@/components/api';
import { statusBadge } from '@/styles/statusBadge';
import { statusLabel } from '@/utils';
import { css } from '@styled-system/css';
import { hstack, vstack } from '@styled-system/patterns';
import { VhsStatusEnum } from '@/models';
import RentalCreateForm from '@/components/RentalCreateForm';
import VhsMarkLostButton from '@/components/VhsMarkLostButton';

type Props = { id: string };

const VhsDetails = ({ id }: Props) => {
  return (
    <VhsById id={id}>
      {({ data, isLoading, error, refetch }) => {
        if (isLoading)
          return (
            <p
              className={css({
                color: '#66fcf1',
                textShadow: '0 0 8px rgba(102,252,241,0.5)',
              })}
            >
              Chargement…
            </p>
          );

        if (error)
          return (
            <div className={vstack({ gap: 3, alignItems: 'flex-start' })}>
              <p
                className={css({
                  color: '#ff2e63',
                  textShadow: '0 0 6px rgba(255,46,99,0.5)',
                })}
              >
                Erreur : {(error as Error).message}
              </p>
              <button
                onClick={refetch}
                className={css({
                  px: 3,
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

        if (!data) return <p>Introuvable.</p>;

        return (
          <section
            className={vstack({
              alignItems: 'flex-start',
              gap: 10,
              w: 'full',
              py: 8,
              px: { base: 4, md: 8 },
              borderRadius: '2xl',
              bg: 'linear-gradient(180deg, rgba(10,10,15,0.95), rgba(15,15,20,0.98))',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow:
                '0 0 25px rgba(255,46,99,0.15), 0 0 45px rgba(102,252,241,0.1)',
              position: 'relative',
              overflow: 'hidden',
              _before: {
                content: '""',
                position: 'absolute',
                inset: 0,
                background:
                  'repeating-linear-gradient(to bottom, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 2px, transparent 3px)',
                pointerEvents: 'none',
              },
            })}
          >
            {/* Section jaquette + infos */}
            <div
              className={hstack({
                alignItems: 'flex-start',
                gap: 10,
                flexWrap: 'wrap',
                w: 'full',
                position: 'relative',
                zIndex: 2,
              })}
            >
              {/* Jaquette */}
              <div
                className={css({
                  position: 'relative',
                  borderRadius: 'xl',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow:
                    '0 0 20px rgba(255,46,99,0.25), 0 0 40px rgba(102,252,241,0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  _hover: {
                    transform: 'scale(1.03)',
                    boxShadow:
                      '0 0 25px rgba(255,46,99,0.4), 0 0 55px rgba(102,252,241,0.35)',
                  },
                })}
              >
                <img
                  src={data.coverUrl}
                  alt={data.title}
                  className={css({
                    display: 'block',
                    w: '280px',
                    h: '420px',
                    objectFit: 'cover',
                    filter: 'saturate(1.05) contrast(1.05)',
                  })}
                />
                {/* Badge de statut */}
                <span
                  className={css({
                    position: 'absolute',
                    top: 2,
                    left: 2,
                    zIndex: 3,
                  })}
                >
                  <span className={statusBadge({ status: data.status })}>
                    {statusLabel[data.status]}
                  </span>
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
                  <h1
                    className={css({
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: { base: '2xl', md: '3xl' },
                      fontWeight: 'bold',
                      background:
                        'linear-gradient(90deg, #ff2e63, #66fcf1, #ffe38a)',
                      backgroundClip: 'text',
                      color: 'transparent',
                      textShadow:
                        '0 0 10px rgba(255,46,99,0.4), 0 0 20px rgba(102,252,241,0.3)',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    })}
                  >
                    {data.title}
                  </h1>

                  {data.year && (
                    <p
                      className={css({
                        color: 'gray.400',
                        fontSize: 'sm',
                        letterSpacing: 'wide',
                      })}
                    >
                      📅 Sortie en {data.year}
                    </p>
                  )}

                  {data.status !== VhsStatusEnum.enum.lost && (
                    <VhsMarkLostButton vhsId={data.id} />
                  )}

                  {data.genres?.length > 0 && (
                    <div
                      className={hstack({
                        gap: 2,
                        flexWrap: 'wrap',
                        mt: 2,
                      })}
                    >
                      {data.genres.map((g) => (
                        <span
                          key={g}
                          className={css({
                            fontSize: 'xs',
                            px: 2,
                            py: 1,
                            rounded: 'full',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#66fcf1',
                            bg: 'rgba(255,255,255,0.05)',
                            textTransform: 'uppercase',
                            letterSpacing: 'wider',
                            textShadow:
                              '0 0 6px rgba(102,252,241,0.4), 0 0 12px rgba(255,46,99,0.25)',
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
                    bg: 'linear-gradient(90deg, #ff2e63, #66fcf1)',
                    opacity: 0.4,
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
              </div>
            </div>

            {data.status === VhsStatusEnum.enum.available && (
              <RentalCreateForm vhs={data} />
            )}
          </section>
        );
      }}
    </VhsById>
  );
};

export default VhsDetails;
