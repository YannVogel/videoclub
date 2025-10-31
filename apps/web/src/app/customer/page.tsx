'use client';

import Link from 'next/link';
import { CustomerList } from '@/components/api/customers/CustomerList';
import { css } from '@styled-system/css';
import { hstack, vstack } from '@styled-system/patterns';

const CustomerPage = () => {
  return (
    <main
      className={vstack({
        p: 8,
        alignItems: 'flex-start',
        gap: 6,
        w: 'full',
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
      {/* En-tête */}
      <div
        className={hstack({
          justifyContent: 'space-between',
          alignItems: 'center',
          w: 'full',
          pb: 4,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
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
              '0 0 10px rgba(255,46,99,0.4), 0 0 20px rgba(102,252,241,0.3)',
            letterSpacing: '0.05em',
          })}
        >
          📇 Liste des clients
        </h1>

        <Link
          href="/customer/create"
          className={css({
            px: 5,
            py: 2,
            rounded: 'md',
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: 'black',
            bg: 'linear-gradient(90deg, #66fcf1 0%, #00e0ff 100%)',
            boxShadow:
              '0 0 10px rgba(102,252,241,0.5), 0 0 25px rgba(102,252,241,0.3)',
            transition:
              'transform 200ms ease, filter 150ms ease, box-shadow 200ms ease',
            _hover: {
              transform: 'translateY(-2px)',
              filter: 'brightness(1.2)',
              boxShadow:
                '0 0 15px rgba(102,252,241,0.6), 0 0 35px rgba(102,252,241,0.4)',
            },
          })}
        >
          + Ajouter un client
        </Link>
      </div>

      {/* Liste des clients */}
      <CustomerList>
        {({ data, isLoading, error }) => {
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
              <p
                className={css({
                  color: '#ff2e63',
                  textShadow: '0 0 6px rgba(255,46,99,0.4)',
                })}
              >
                Erreur de chargement.
              </p>
            );

          if (!data || data.length === 0)
            return (
              <p
                className={css({
                  color: 'gray.400',
                  fontStyle: 'italic',
                })}
              >
                Aucun client trouvé pour le moment.
              </p>
            );

          return (
            <ul
              className={vstack({
                alignItems: 'flex-start',
                gap: 3,
                w: 'full',
                mt: 4,
              })}
            >
              {data.map((customer, index) => (
                <li key={customer.id} className={css({ w: 'full' })}>
                  <Link
                    href={`/customer/${customer.id}`}
                    className={css({
                      display: 'block',
                      px: 4,
                      py: 3,
                      rounded: 'md',
                      w: 'full',
                      fontSize: 'md',
                      fontWeight: 'medium',
                      color: '#e0e0e0',
                      bg: 'rgba(25,25,30,0.9)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      textShadow: '0 0 4px rgba(255,255,255,0.15)',
                      boxShadow:
                        index % 2 === 0
                          ? '0 0 8px rgba(102,252,241,0.05)'
                          : '0 0 8px rgba(255,46,99,0.05)',
                      transition:
                        'background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease',
                      _hover: {
                        bg: 'rgba(35,35,45,0.95)',
                        transform: 'translateX(4px)',
                        boxShadow:
                          '0 0 10px rgba(102,252,241,0.25), inset 0 0 6px rgba(255,46,99,0.15)',
                        color: '#66fcf1',
                        textShadow: '0 0 6px rgba(102,252,241,0.4)',
                      },
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
