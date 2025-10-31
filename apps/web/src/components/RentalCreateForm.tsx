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

  return (
    <section
      className={vstack({
        alignItems: 'flex-start',
        gap: 5,
        w: 'full',
        p: 6,
        border: '1px solid rgba(255,255,255,0.08)',
        rounded: '2xl',
        bg: 'linear-gradient(180deg, rgba(10,10,15,0.9), rgba(20,20,25,0.95))',
        boxShadow:
          '0 0 20px rgba(102,252,241,0.08), 0 0 40px rgba(255,46,99,0.05)',
      })}
    >
      <h2
        className={css({
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '2xl',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          background:
            'linear-gradient(90deg, #66fcf1, #00e0ff, #33ffff, #66fcf1)',
          backgroundClip: 'text',
          color: 'transparent',
          textShadow:
            '0 0 8px rgba(102,252,241,0.4), 0 0 16px rgba(255,255,255,0.1)',
        })}
      >
        🎥 Louer cette VHS
      </h2>

      <CustomerList>
        {({ data, isLoading, error, refetch }) => {
          const filtered =
            data?.filter((c) =>
              `${c.firstName} ${c.lastName}`
                .toLowerCase()
                .includes(search.toLowerCase()),
            ) ?? [];

          if (isLoading)
            return (
              <p
                className={css({
                  color: '#66fcf1',
                  textShadow: '0 0 6px rgba(102,252,241,0.4)',
                })}
              >
                Chargement des clients…
              </p>
            );

          if (error)
            return (
              <div>
                <p
                  className={css({
                    color: '#ff2e63',
                    mb: 2,
                  })}
                >
                  Erreur : {(error as Error).message}
                </p>
                <Button
                  onPress={refetch}
                  className={css({
                    bg: 'rgba(255,255,255,0.08)',
                    color: '#66fcf1',
                    px: 4,
                    py: 2,
                    rounded: 'md',
                    _hover: {
                      bg: 'rgba(255,255,255,0.15)',
                      textShadow: '0 0 8px #66fcf1',
                    },
                  })}
                >
                  Réessayer
                </Button>
              </div>
            );

          if (!data) return null;

          return (
            <>
              <Label
                className={css({
                  fontWeight: 'bold',
                  fontSize: 'sm',
                  color: '#66fcf1',
                  textTransform: 'uppercase',
                  letterSpacing: 'wider',
                })}
              >
                Choisir un client :
              </Label>

              <Input
                placeholder="Rechercher un client..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={css({
                  w: 'full',
                  p: 3,
                  rounded: 'md',
                  bg: 'rgba(25,25,30,0.95)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontSize: 'sm',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  _focus: {
                    borderColor: '#66fcf1',
                    boxShadow: '0 0 10px rgba(102,252,241,0.3)',
                  },
                })}
              />

              <Select
                value={selected || undefined}
                onChange={(key) => setSelected(key as string)}
                className={css({
                  w: 'full',
                  mt: 3,
                  bg: 'rgba(25,25,30,0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  rounded: 'md',
                  color: 'white',
                  overflow: 'hidden',
                  _focusWithin: {
                    boxShadow: '0 0 10px rgba(102,252,241,0.25)',
                  },
                })}
              >
                <ListBox>
                  {filtered.map((c) => {
                    const isSelected = selected === c.id;
                    return (
                      <ListBoxItem
                        key={c.id}
                        id={c.id}
                        textValue={`${c.firstName} ${c.lastName}`}
                        className={css({
                          px: 3,
                          py: 2,
                          cursor: 'pointer',
                          fontSize: 'sm',
                          borderBottom: '1px solid rgba(255,255,255,0.05)',
                          transition: 'background 0.15s ease, color 0.15s ease',
                          color: isSelected ? '#66fcf1' : 'white',
                          bg: isSelected
                            ? 'rgba(102,252,241,0.1)'
                            : 'transparent',
                          textShadow: isSelected
                            ? '0 0 8px rgba(102,252,241,0.6)'
                            : 'none',
                          _hover: !isSelected
                            ? {
                                bg: 'rgba(102,252,241,0.12)',
                                color: '#66fcf1',
                                textShadow: '0 0 6px rgba(102,252,241,0.4)',
                              }
                            : {},
                        })}
                      >
                        {`${c.firstName} ${c.lastName}`}
                      </ListBoxItem>
                    );
                  })}
                </ListBox>
              </Select>

              <RentalCreate>
                {({ mutate, isPending, error }) => (
                  <>
                    {!!error && (
                      <p
                        className={css({
                          color: '#ff2e63',
                          fontSize: 'sm',
                          mt: 2,
                          textShadow: '0 0 6px rgba(255,46,99,0.4)',
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
                        mt: 5,
                        alignSelf: 'center',
                        px: 6,
                        py: 3,
                        rounded: 'md',
                        fontFamily: "'Orbitron', sans-serif",
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: 'wide',
                        color: 'black',
                        bg: 'linear-gradient(90deg, #66fcf1 0%, #00e0ff 100%)',
                        boxShadow:
                          '0 0 15px rgba(102,252,241,0.6), 0 0 35px rgba(102,252,241,0.3)',
                        transition:
                          'transform 200ms ease, filter 150ms ease, box-shadow 200ms ease',
                        _hover: {
                          transform: 'translateY(-3px)',
                          filter: 'brightness(1.2)',
                          boxShadow:
                            '0 0 20px rgba(102,252,241,0.8), 0 0 40px rgba(102,252,241,0.4)',
                        },
                        _disabled: {
                          opacity: 0.5,
                          cursor: 'not-allowed',
                        },
                      })}
                    >
                      {isPending
                        ? '⏳ Location en cours…'
                        : '▶ Confirmer la location'}
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
