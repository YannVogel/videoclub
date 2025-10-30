'use client';

import { useState } from 'react';
import { CustomerList } from '@/components/api/customers/CustomerList';
import { RentalCreate } from '@/components/api/rentals';
import { Vhs } from '@/models';
import { css } from '@styled-system/css';
import { vstack } from '@styled-system/patterns';
import {
  Button,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Select,
} from 'react-aria-components';

type Props = { vhs: Vhs };

const RentalCreateForm = ({ vhs }: Props) => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  console.log('selected', selected);
  return (
    <section
      className={vstack({
        alignItems: 'flex-start',
        gap: 4,
        w: 'full',
        p: 4,
        borderWidth: 1,
        borderColor: 'gray.700',
        rounded: 'xl',
        bg: 'gray.900',
        shadow: 'md',
      })}
    >
      <h2
        className={css({
          fontSize: '2xl',
          fontWeight: 'bold',
          background: 'linear-gradient(90deg,#ff4df0,#00e0ff,#ffe38a,#ff4df0)',
          backgroundClip: 'text',
          color: 'transparent',
        })}
      >
        Louer cette VHS
      </h2>

      <CustomerList>
        {({ data, isLoading, error, refetch }) => {
          // ⚙️ Tous les hooks sont déjà définis plus haut
          const filtered =
            data?.filter((c) =>
              `${c.firstName} ${c.lastName}`
                .toLowerCase()
                .includes(search.toLowerCase()),
            ) ?? [];

          if (isLoading) return <p>Chargement des clients…</p>;
          if (error)
            return (
              <div>
                <p>Erreur : {(error as Error).message}</p>
                <Button onPress={refetch}>Réessayer</Button>
              </div>
            );
          if (!data) return null;

          return (
            <>
              <Label
                className={css({ fontWeight: 'semibold', color: 'gray.300' })}
              >
                Choisir un client :
              </Label>

              <Input
                placeholder="Rechercher un client..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={css({
                  w: 'full',
                  p: 2,
                  rounded: 'md',
                  bg: 'gray.800',
                  color: 'white',
                  border: '1px solid',
                  borderColor: 'gray.700',
                  outline: 'none',
                  _focus: { borderColor: 'blue.400' },
                })}
              />

              <Select
                value={selected || undefined}
                onChange={(key) => setSelected(key as string)}
                className={css({
                  w: 'full',
                  mt: 2,
                  bg: 'gray.800',
                  border: '1px solid',
                  borderColor: 'gray.700',
                  rounded: 'md',
                  color: 'white',
                  overflow: 'hidden',
                })}
              >
                <ListBox>
                  {filtered.map((c) => (
                    <ListBoxItem
                      className={css({ cursor: 'pointer' })}
                      key={c.id}
                      id={c.id}
                      textValue={`${c.firstName} ${c.lastName}`}
                    >
                      {`${c.firstName} ${c.lastName}`}
                    </ListBoxItem>
                  ))}
                </ListBox>
              </Select>

              <RentalCreate>
                {({ mutate, isPending, error }) => (
                  <>
                    {error && (
                      <p
                        className={css({
                          color: 'red.400',
                          fontSize: 'sm',
                        })}
                      >
                        Erreur : {(error as Error).message}
                      </p>
                    )}

                    <Button
                      isDisabled={!selected || isPending}
                      onPress={() =>
                        selected &&
                        mutate({ vhsId: vhs.id, customerId: selected })
                      }
                      className={css({
                        mt: 3,
                        px: 4,
                        py: 2,
                        rounded: 'md',
                        bg: 'blue.600',
                        color: 'white',
                        fontWeight: 'semibold',
                        _hover: { bg: 'blue.500' },
                        _disabled: { opacity: 0.5 },
                      })}
                    >
                      {isPending
                        ? 'Location en cours…'
                        : 'Confirmer la location'}
                    </Button>
                  </>
                )}
              </RentalCreate>
            </>
          );
        }}
      </CustomerList>
    </section>
  );
};

export default RentalCreateForm;
