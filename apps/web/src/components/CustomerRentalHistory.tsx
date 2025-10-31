'use client';

import { RentalListByCustomer } from '@/components/api/rentals';
import { css } from '@styled-system/css';
import { hstack, vstack } from '@styled-system/patterns';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import RentalReturnButton from '@/components/RentalReturnButton';

type Props = {
  customerId: string;
};

const CustomerRentalHistory = ({ customerId }: Props) => {
  const now = new Date();

  return (
    <section
      className={vstack({
        alignItems: 'flex-start',
        gap: 4,
        mt: 8,
        w: 'full',
      })}
    >
      <h2
        className={css({
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '2xl',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          background: 'linear-gradient(90deg,#ff2e63,#66fcf1,#ffe38a,#ff2e63)',
          backgroundClip: 'text',
          color: 'transparent',
          textShadow:
            '0 0 10px rgba(255,46,99,0.4), 0 0 20px rgba(102,252,241,0.3)',
          mb: 2,
        })}
      >
        Historique des locations
      </h2>

      <RentalListByCustomer customerId={customerId}>
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
                    textShadow: '0 0 6px rgba(255,46,99,0.4)',
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
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#66fcf1',
                    transition: 'all 0.2s ease',
                    _hover: {
                      bg: 'rgba(255,255,255,0.12)',
                      textShadow: '0 0 6px #66fcf1',
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
                })}
              >
                Aucune location enregistrée pour ce client.
              </p>
            );

          return (
            <div
              className={vstack({
                w: 'full',
                border: '1px solid rgba(255,255,255,0.08)',
                rounded: 'xl',
                overflow: 'hidden',
                p: 4,
                boxShadow:
                  '0 0 12px rgba(255,46,99,0.1), 0 0 24px rgba(102,252,241,0.08)',
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
                  {
                    locale: fr,
                  },
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
                      alignItems: 'center',
                      w: 'full',
                      p: 4,
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      _last: { borderBottom: 'none' },
                      transition: 'background 0.2s ease',
                      _hover: { bg: 'rgba(255,255,255,0.03)' },
                    })}
                  >
                    {/* Infos */}
                    <div
                      className={vstack({
                        alignItems: 'flex-start',
                        gap: 1,
                        color: 'gray.200',
                      })}
                    >
                      <p
                        className={css({
                          fontWeight: 'medium',
                          fontSize: 'sm',
                        })}
                      >
                        🎞️ Cassette :{' '}
                        <span
                          className={css({
                            color: '#66fcf1',
                            textShadow: '0 0 4px rgba(102,252,241,0.4)',
                          })}
                        >
                          {typeof rental.vhs === 'string'
                            ? rental.vhs
                            : rental.vhs?.title || 'Inconnue'}
                        </span>
                      </p>
                      <p
                        className={css({
                          color: 'gray.400',
                          fontSize: 'sm',
                        })}
                      >
                        Louée le {rentedAt} — à rendre pour le {dueDate}
                      </p>
                    </div>

                    {/* Bouton de retour */}
                    {!rental.returnedAt && (
                      <RentalReturnButton rentalId={rental.id} />
                    )}

                    {/* Statut */}
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
      </RentalListByCustomer>
    </section>
  );
};

export default CustomerRentalHistory;
