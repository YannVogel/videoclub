'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomerSchema } from '@/models/customer';
import { z } from 'zod';
import { css } from '@styled-system/css';
import { vstack } from '@styled-system/patterns';
import { CustomerCreate } from '@/components/api/customers/CustomerCreate';
import { useRouter } from 'next/navigation';

const CreateCustomerPage = () => {
  const schema = CustomerSchema.omit({ id: true, createdAt: true });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  return (
    <main
      className={vstack({
        p: 8,
        alignItems: 'flex-start',
        gap: 8,
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
        Ajouter un client
      </h1>

      <CustomerCreate>
        {({ mutate, isPending, error }) => (
          <form
            onSubmit={handleSubmit((data) => {
              mutate(data, {
                onSuccess: () => router.push('/customer'),
              });
            })}
            className={vstack({
              gap: 6,
              alignItems: 'flex-start',
              bg: 'rgba(15,15,20,0.85)',
              p: 8,
              rounded: 'xl',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow:
                '0 0 20px rgba(255,46,99,0.1), 0 0 40px rgba(102,252,241,0.08)',
              maxW: 'lg',
              w: 'full',
            })}
          >
            {[
              { id: 'firstName', label: 'Prénom' },
              { id: 'lastName', label: 'Nom' },
              { id: 'email', label: 'Email', type: 'email' },
              { id: 'phone', label: 'Téléphone' },
            ].map(({ id, label, type }) => (
              <div
                key={id}
                className={vstack({ alignItems: 'flex-start', w: 'full' })}
              >
                <label
                  htmlFor={id}
                  className={css({
                    color: '#66fcf1',
                    fontWeight: 'semibold',
                    textTransform: 'uppercase',
                    fontSize: 'sm',
                    letterSpacing: 'wide',
                    mb: 1,
                  })}
                >
                  {label}
                </label>
                <input
                  id={id}
                  type={type ?? 'text'}
                  {...register(id as keyof z.infer<typeof schema>)}
                  className={css({
                    w: 'full',
                    p: 3,
                    rounded: 'md',
                    bg: 'rgba(30,30,35,0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    transition: 'all 0.2s ease',
                    _focus: {
                      borderColor: '#66fcf1',
                      boxShadow: '0 0 10px rgba(102,252,241,0.3)',
                    },
                  })}
                />
                {errors[id as keyof z.infer<typeof schema>] && (
                  <p
                    className={css({
                      color: '#ff2e63',
                      fontSize: 'sm',
                      mt: 1,
                      textShadow: '0 0 6px rgba(255,46,99,0.4)',
                    })}
                  >
                    {errors[
                      id as keyof z.infer<typeof schema>
                    ]?.message?.toString()}
                  </p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={isPending}
              className={css({
                alignSelf: 'center',
                mt: 4,
                px: 8,
                py: 3,
                rounded: 'md',
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 'bold',
                textTransform: 'uppercase',
                color: 'black',
                bg: 'linear-gradient(90deg, #66fcf1 0%, #ff2e63 100%)',
                boxShadow:
                  '0 0 12px rgba(102,252,241,0.5), 0 0 24px rgba(255,46,99,0.5)',
                textShadow: '0 0 6px rgba(0,0,0,0.4)',
                transition: 'transform 150ms ease, filter 150ms ease',
                _hover: {
                  transform: 'translateY(-3px)',
                  filter: 'brightness(1.2)',
                },
                _disabled: { opacity: 0.5, cursor: 'not-allowed' },
              })}
            >
              {isPending ? 'Enregistrement…' : 'Créer le client'}
            </button>

            {!!error && (
              <p
                className={css({
                  color: '#ff2e63',
                  fontWeight: 'medium',
                  textShadow: '0 0 6px rgba(255,46,99,0.4)',
                })}
              >
                ⚠️ Une erreur est survenue.
              </p>
            )}
          </form>
        )}
      </CustomerCreate>
    </main>
  );
};

export default CreateCustomerPage;
