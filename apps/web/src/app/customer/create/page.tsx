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
      className={vstack({ p: 6, alignItems: 'flex-start', gap: 4, w: 'full' })}
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
        Ajouter un client
      </h1>

      <CustomerCreate>
        {({ mutate, isPending, error }) => (
          <form
            onSubmit={handleSubmit((data) => {
              mutate(data, {
                onSuccess: () => {
                  router.push('/customer');
                },
              });
            })}
            className={vstack({
              gap: 4,
              alignItems: 'flex-start',
              bg: 'gray.900',
              p: 6,
              rounded: 'xl',
              borderWidth: 1,
              borderColor: 'gray.800',
              w: 'full',
              maxW: 'lg',
              shadow: 'md',
            })}
          >
            <div className={vstack({ alignItems: 'flex-start', w: 'full' })}>
              <label
                htmlFor="firstName"
                className={css({ fontWeight: 'semibold' })}
              >
                Prénom
              </label>
              <input
                id="firstName"
                {...register('firstName')}
                className={css({
                  w: 'full',
                  p: 2,
                  rounded: 'md',
                  bg: 'gray.800',
                  borderWidth: 1,
                  borderColor: 'gray.700',
                  color: 'white',
                  _focus: { borderColor: 'blue.400', outline: 'none' },
                })}
              />
              {errors.firstName && (
                <p className={css({ color: 'red.400', fontSize: 'sm' })}>
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className={vstack({ alignItems: 'flex-start', w: 'full' })}>
              <label
                htmlFor="lastName"
                className={css({ fontWeight: 'semibold' })}
              >
                Nom
              </label>
              <input
                id="lastName"
                {...register('lastName')}
                className={css({
                  w: 'full',
                  p: 2,
                  rounded: 'md',
                  bg: 'gray.800',
                  borderWidth: 1,
                  borderColor: 'gray.700',
                  color: 'white',
                  _focus: { borderColor: 'blue.400', outline: 'none' },
                })}
              />
              {errors.lastName && (
                <p className={css({ color: 'red.400', fontSize: 'sm' })}>
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className={vstack({ alignItems: 'flex-start', w: 'full' })}>
              <label
                htmlFor="email"
                className={css({ fontWeight: 'semibold' })}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className={css({
                  w: 'full',
                  p: 2,
                  rounded: 'md',
                  bg: 'gray.800',
                  borderWidth: 1,
                  borderColor: 'gray.700',
                  color: 'white',
                  _focus: { borderColor: 'blue.400', outline: 'none' },
                })}
              />
              {errors.email && (
                <p className={css({ color: 'red.400', fontSize: 'sm' })}>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className={vstack({ alignItems: 'flex-start', w: 'full' })}>
              <label
                htmlFor="phone"
                className={css({ fontWeight: 'semibold' })}
              >
                Téléphone
              </label>
              <input
                id="phone"
                {...register('phone')}
                className={css({
                  w: 'full',
                  p: 2,
                  rounded: 'md',
                  bg: 'gray.800',
                  borderWidth: 1,
                  borderColor: 'gray.700',
                  color: 'white',
                  _focus: { borderColor: 'blue.400', outline: 'none' },
                })}
              />
              {errors.phone && (
                <p className={css({ color: 'red.400', fontSize: 'sm' })}>
                  {errors.phone.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className={css({
                px: 6,
                py: 2,
                rounded: 'md',
                fontWeight: 'semibold',
                color: 'white',
                bg: 'blue.600',
                textShadow:
                  '0 0 8px rgba(59,130,246,0.35), 0 0 12px rgba(59,130,246,0.25)',
                _hover: { bg: 'blue.500', transform: 'translateY(-2px)' },
                _disabled: { opacity: 0.6, cursor: 'not-allowed' },
                transition:
                  'background 150ms ease, transform 150ms ease, opacity 120ms ease',
              })}
            >
              {isPending ? 'Enregistrement…' : 'Créer le client'}
            </button>
          </form>
        )}
      </CustomerCreate>
    </main>
  );
};

export default CreateCustomerPage;
