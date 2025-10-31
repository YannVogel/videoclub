'use client';

import { CustomerById } from '@/components/api/customers/CustomerById';
import { css } from '@styled-system/css';
import { hstack, vstack } from '@styled-system/patterns';

type Props = { id: string };

const CustomerDetails = ({ id }: Props) => {
  return (
    <CustomerById id={id}>
      {({ data, isLoading, error, refetch }) => {
        if (isLoading)
          return (
            <p
              className={css({
                color: '#66fcf1',
                textShadow: '0 0 6px rgba(102,252,241,0.4)',
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

        if (!data)
          return (
            <p
              className={css({
                color: 'gray.400',
                fontStyle: 'italic',
              })}
            >
              Introuvable.
            </p>
          );

        return (
          <section
            className={vstack({
              alignItems: 'flex-start',
              gap: 8,
              p: 8,
              w: 'full',
              border: '1px solid rgba(255,255,255,0.08)',
              rounded: '2xl',
              bg: 'linear-gradient(180deg, rgba(10,10,15,0.9), rgba(20,20,25,0.95))',
              boxShadow:
                '0 0 25px rgba(102,252,241,0.08), 0 0 45px rgba(255,46,99,0.06)',
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
            {/* Nom principal */}
            <h1
              className={css({
                fontFamily: "'Orbitron', sans-serif",
                fontSize: { base: '2xl', md: '3xl' },
                fontWeight: 'bold',
                textTransform: 'uppercase',
                background: 'linear-gradient(90deg, #ff2e63, #66fcf1, #ffe38a)',
                backgroundClip: 'text',
                color: 'transparent',
                textShadow:
                  '0 0 10px rgba(255,46,99,0.4), 0 0 20px rgba(102,252,241,0.3)',
                letterSpacing: '0.05em',
              })}
            >
              {data.firstName} {data.lastName}
            </h1>

            {/* Carte d'informations */}
            <div
              className={vstack({
                gap: 5,
                alignItems: 'flex-start',
                w: 'full',
                bg: 'rgba(25,25,30,0.9)',
                p: 6,
                rounded: 'xl',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow:
                  '0 0 15px rgba(102,252,241,0.06), 0 0 25px rgba(255,46,99,0.04)',
              })}
            >
              <h2
                className={css({
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 'semibold',
                  fontSize: 'lg',
                  textTransform: 'uppercase',
                  color: '#66fcf1',
                  letterSpacing: 'wider',
                  mb: 2,
                })}
              >
                Informations personnelles
              </h2>

              <div
                className={hstack({
                  gap: 6,
                  flexWrap: 'wrap',
                  fontSize: 'sm',
                  color: 'gray.300',
                })}
              >
                <p>
                  ✉️ Email :{' '}
                  <span
                    className={css({
                      color: '#66fcf1',
                      textShadow: '0 0 6px rgba(102,252,241,0.4)',
                    })}
                  >
                    {data.email}
                  </span>
                </p>

                {data.phone && (
                  <p>
                    ☎️ Téléphone :{' '}
                    <span
                      className={css({
                        color: '#ffb3d1',
                        textShadow: '0 0 6px rgba(255,46,99,0.4)',
                      })}
                    >
                      {data.phone}
                    </span>
                  </p>
                )}
              </div>

              <p
                className={css({
                  color: 'gray.400',
                  fontSize: 'sm',
                  pt: 3,
                })}
              >
                🕓 Client depuis le{' '}
                <span
                  className={css({
                    color: '#ffe38a',
                    textShadow: '0 0 6px rgba(255,215,130,0.3)',
                  })}
                >
                  {new Date(data.createdAt).toLocaleDateString('fr-FR')}
                </span>
              </p>
            </div>
          </section>
        );
      }}
    </CustomerById>
  );
};

export default CustomerDetails;
