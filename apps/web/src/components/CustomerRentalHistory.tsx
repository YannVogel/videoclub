'use client';

import { RentalListByCustomer } from '@/components/api/rentals';
import { css } from '@styled-system/css';
import { hstack, vstack } from '@styled-system/patterns';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type Props = {
  customerId: string;
};

const CustomerRentalHistory = ({ customerId }: Props) => {
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
          fontSize: '2xl',
          fontWeight: 'bold',
          color: 'white',
          textShadow: '0 0 6px rgba(255,255,255,0.3)',
        })}
      >
        Historique des locations
      </h2>

      <RentalListByCustomer customerId={customerId}>
        {({ data, isLoading, error, refetch }) => {
          if (isLoading) return <p>Chargement…</p>;
          if (error)
            return (
              <div className={vstack({ alignItems: 'flex-start', gap: 2 })}>
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

          if (!data || data.length === 0)
            return <p>Aucune location enregistrée pour ce client.</p>;

          return (
            <div
              className={vstack({
                w: 'full',
                borderWidth: 1,
                borderColor: 'gray.700',
                rounded: 'xl',
                overflow: 'hidden',
              })}
            >
              {data.map((rental) => {
                const overdue = !rental.returnedAt && new Date(rental.dueDate);
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
                      w: 'full',
                      p: 4,
                      borderBottomWidth: 1,
                      borderColor: 'gray.700',
                      _last: { borderBottomWidth: 0 },
                    })}
                  >
                    <div
                      className={vstack({ alignItems: 'flex-start', gap: 1 })}
                    >
                      <p
                        className={css({
                          color: 'gray.200',
                          fontWeight: 'medium',
                        })}
                      >
                        Cassette :{' '}
                        {typeof rental.vhs === 'string'
                          ? rental.vhs
                          : rental.vhs?.title || 'Inconnue'}
                      </p>
                      <p className={css({ color: 'gray.400', fontSize: 'sm' })}>
                        Louée le {rentedAt} — à rendre pour le {dueDate}
                      </p>
                    </div>

                    <span
                      className={css({
                        px: 3,
                        py: 1,
                        rounded: 'full',
                        fontSize: 'sm',
                        fontWeight: 'bold',
                        bg: returnedAt ? 'green.700' : 'red.700',
                        color: 'white',
                      })}
                    >
                      {returnedAt ? `Rendue le ${returnedAt}` : `Non rendue`}
                      {overdue ? ' (en retard)' : ''}
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
