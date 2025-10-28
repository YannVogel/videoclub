'use client';

import { CustomerById } from '@/components/api/customers/CustomerById';
import { css } from '@styled-system/css';
import { hstack, vstack } from '@styled-system/patterns';

type Props = { id: string };

const CustomerDetails = ({ id }: Props) => {
  return (
    <CustomerById id={id}>
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
            className={vstack({
              alignItems: 'flex-start',
              gap: 4,
              p: 6,
              w: 'full',
              color: 'gray.100',
            })}
          >
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
              {data.firstName} {data.lastName}
            </h1>

            <div
              className={vstack({
                gap: 3,
                alignItems: 'flex-start',
                bg: 'gray.900',
                p: 5,
                rounded: 'xl',
                borderWidth: 1,
                borderColor: 'gray.800',
                shadow: 'md',
              })}
            >
              <h2 className={css({ fontWeight: 'semibold', fontSize: 'lg' })}>
                Informations personnelles
              </h2>

              <div className={hstack({ gap: 6, flexWrap: 'wrap' })}>
                <p>
                  Email :{' '}
                  <span className={css({ color: 'blue.300' })}>
                    {data.email}
                  </span>
                </p>
                {data.phone && <p>Téléphone : {data.phone}</p>}
              </div>

              <p
                className={css({
                  color: 'gray.400',
                  fontSize: 'sm',
                  pt: 3,
                })}
              >
                Client depuis le{' '}
                {new Date(data.createdAt).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </section>
        );
      }}
    </CustomerById>
  );
};

export default CustomerDetails;
