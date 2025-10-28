'use client';

import Link from 'next/link';
import { CustomerList } from '@/components/api/customers/CustomerList';
import { css } from '@styled-system/css';
import { vstack } from '@styled-system/patterns';

const CustomerPage = () => {
  return (
    <main className={vstack({ p: 6, alignItems: 'flex-start', gap: 4 })}>
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
        Liste des clients
      </h1>

      <CustomerList>
        {({ data, isLoading, error }) => {
          if (isLoading) return <p>Chargement…</p>;
          if (error) return <p>Erreur de chargement.</p>;
          if (!data || data.length === 0)
            return <p>Aucun client trouvé pour le moment.</p>;

          return (
            <ul
              className={vstack({
                alignItems: 'flex-start',
                gap: 2,
                w: 'full',
                mt: 2,
              })}
            >
              {data.map((customer) => (
                <li key={customer.id}>
                  <Link
                    href={`/customer/${customer.id}`}
                    className={css({
                      display: 'block',
                      fontSize: 'md',
                      color: 'gray.100',
                      px: 3,
                      py: 2,
                      rounded: 'md',
                      bg: 'gray.900',
                      borderWidth: 1,
                      borderColor: 'gray.800',
                      w: 'full',
                      _hover: {
                        bg: 'gray.800',
                        transform: 'translateX(2px)',
                      },
                      transition: 'background 150ms ease, transform 120ms ease',
                    })}
                  >
                    {customer.firstName} {customer.lastName}
                  </Link>
                </li>
              ))}
            </ul>
          );
        }}
      </CustomerList>
    </main>
  );
};

export default CustomerPage;
