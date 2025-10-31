'use client';

import { RentalListByVhs } from '@/components/api/rentals';
import { css } from '@styled-system/css';
import { hstack, vstack } from '@styled-system/patterns';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import RentalReturnButton from '@/components/RentalReturnButton';

type Props = {
  vhsId: string;
};

const VhsRentalHistory = ({ vhsId }: Props) => {
  const now = new Date();

  return (
    <section
      className={vstack({
        alignItems: 'flex-start',
        gap: 6,
        mt: 10,
        w: 'full',
        p: 6,
        rounded: '2xl',
        border: '1px solid rgba(255,255,255,0.08)',
        bg: 'linear-gradient(180deg, rgba(15,15,20,0.9), rgba(10,10,15,0.95))',
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
      <h2
        className={css({
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '2xl',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          background: 'linear-gradient(90deg, #66fcf1, #00e0ff, #33ffff)',
          backgroundClip: 'text',
          color: 'transparent',
          textShadow: '0 0 8px rgba(102,252,241,0.4)',
        })}
      >
        📼 Historique des locations
      </h2>

      <RentalListByVhs vhsId={vhsId}>
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
              <div className={vstack({ alignItems: 'flex-start', gap: 2 })}>
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

          if (!data || data.length === 0)
            return (
              <p
                className={css({
                  color: 'gray.400',
                  fontStyle: 'italic',
                  textShadow: '0 0 4px rgba(255,255,255,0.1)',
                })}
              >
                Aucune location enregistrée pour cette cassette.
              </p>
            );

          return (
            <div
              className={vstack({
                w: 'full',
                border: '1px solid rgba(255,255,255,0.08)',
                rounded: 'xl',
                overflow: 'hidden',
                boxShadow:
                  '0 0 15px rgba(102,252,241,0.05), 0 0 30px rgba(255,46,99,0.05)',
              })}
            >
              {data.map((rental) => {
                const overdue =
                  !rental.returnedAt && new Date(rental.dueDate) < now;
                const rentedAt = format(
                  new Date(rental.rentedAt),
                  'dd MMM yyyy',
                  { locale: fr },
                );
                const dueDate = format(
                  new Date(rental.dueDate),
                  'dd MMM yyyy',
                  { locale: fr },
                );
                const returnedAt = rental.returnedAt
                  ? format(new Date(rental.returnedAt), 'dd MMM yyyy', {
                      locale: fr,
                    })
                  : null;

                return (
                  <div
                    key={rental.id}
                    className={hstack({
                      justifyContent: 'space-between',
                      w: 'full',
                      p: 4,
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      bg: 'rgba(25,25,30,0.9)',
                      transition:
                        'background 0.25s ease, box-shadow 0.25s ease',
                      _hover: {
                        bg: 'rgba(35,35,45,0.95)',
                        boxShadow:
                          '0 0 12px rgba(102,252,241,0.15), inset 0 0 6px rgba(255,46,99,0.1)',
                      },
                      _last: { borderBottom: 'none' },
                    })}
                  >
                    {/* Infos client */}
                    <div
                      className={vstack({
                        alignItems: 'flex-start',
                        gap: 1,
                        p: 4,
                      })}
                    >
                      <p
                        className={css({
                          color: '#66fcf1',
                          fontWeight: 'semibold',
                          textShadow: '0 0 6px rgba(102,252,241,0.3)',
                        })}
                      >
                        👤{' '}
                        {typeof rental.customer === 'string'
                          ? rental.customer
                          : `${rental.customer.firstName} ${rental.customer.lastName}`}
                      </p>
                      <p
                        className={css({
                          color: 'gray.400',
                          fontSize: 'sm',
                        })}
                      >
                        Louée le <strong>{rentedAt}</strong> — à rendre pour{' '}
                        <strong>{dueDate}</strong>
                      </p>
                    </div>

                    {/* Bouton de retour */}
                    {!rental.returnedAt && (
                      <RentalReturnButton rentalId={rental.id} />
                    )}

                    {/* État de la location */}
                    <span
                      className={css({
                        px: 3,
                        py: 1,
                        rounded: 'full',
                        fontSize: 'sm',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: 'wide',
                        bg: returnedAt
                          ? 'linear-gradient(90deg,#00e676,#00c853)'
                          : overdue
                            ? 'linear-gradient(90deg,#ff1744,#ff5252)'
                            : 'linear-gradient(90deg,#ff9100,#ffb74d)',
                        color: returnedAt
                          ? '#b9ffce'
                          : overdue
                            ? '#ffb3d1'
                            : '#fff4c2',
                        textShadow: returnedAt
                          ? '0 0 6px rgba(0,230,118,0.6)'
                          : overdue
                            ? '0 0 6px rgba(255,46,99,0.5)'
                            : '0 0 6px rgba(255,215,130,0.4)',
                        boxShadow:
                          '0 0 10px rgba(255,255,255,0.1), 0 0 20px rgba(0,0,0,0.2)',
                      })}
                    >
                      {returnedAt
                        ? `Rendue le ${returnedAt}`
                        : overdue
                          ? `En retard !`
                          : `Non rendue`}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        }}
      </RentalListByVhs>
    </section>
  );
};

export default VhsRentalHistory;
