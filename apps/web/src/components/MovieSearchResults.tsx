'use client';

import { Button, ListBox, ListBoxItem } from 'react-aria-components';
import { css } from '@styled-system/css';
import { grid } from '@styled-system/patterns';

type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster?: string;
};

type Props = {
  results: Movie[];
  onSelect: (imdbID: string) => void;
  selected?: boolean;
};

export const MovieSearchResults = ({ results, onSelect, selected }: Props) => {
  if (results.length === 0 || selected) return null;

  return (
    <ListBox
      aria-label="Résultats de recherche de films"
      selectionMode="none"
      orientation="horizontal"
      className={grid({
        gap: 6,
        mt: 6,
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        justifyItems: 'center',
      })}
    >
      {results.map((movie) => (
        <ListBoxItem
          id={movie.imdbID}
          key={movie.imdbID}
          textValue={movie.Title}
        >
          <Button
            onPress={() => onSelect(movie.imdbID)}
            aria-label={`Sélectionner ${movie.Title} (${movie.Year})`}
            className={css({
              w: 'full',
              maxW: '200px',
              cursor: 'pointer',
              display: 'flex',
              flexDir: 'column',
              alignItems: 'center',
              p: 3,
              rounded: 'xl',
              border: '1px solid rgba(255,255,255,0.08)',
              bg: 'rgba(15,15,20,0.75)',
              boxShadow:
                '0 0 10px rgba(255,46,99,0.25), 0 0 20px rgba(102,252,241,0.15)',
              transition:
                'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
              _hover: {
                transform: 'translateY(-3px)',
                bg: 'rgba(30,30,40,0.85)',
                boxShadow:
                  '0 0 14px rgba(255,46,99,0.5), 0 0 28px rgba(102,252,241,0.4)',
              },
              _focusVisible: {
                outline: '2px solid #66fcf1',
                outlineOffset: '3px',
              },
            })}
          >
            <img
              src={
                movie.Poster !== 'N/A'
                  ? movie.Poster
                  : `https://placehold.co/220x300?text=${encodeURIComponent(
                      movie.Title,
                    )}`
              }
              alt=""
              className={css({
                w: 'full',
                h: '240px',
                objectFit: 'cover',
                borderRadius: 'md',
                mb: 3,
                border: '1px solid rgba(255,255,255,0.1)',
              })}
            />
            <h3
              className={css({
                fontWeight: 'bold',
                fontSize: 'md',
                textAlign: 'center',
                color: 'white',
                mb: 1,
                lineHeight: 'short',
                textShadow:
                  '0 0 8px rgba(255,46,99,0.35), 0 0 16px rgba(102,252,241,0.3)',
              })}
            >
              {movie.Title}
            </h3>
            <span
              className={css({
                fontSize: 'sm',
                color: '#66fcf1',
                textShadow:
                  '0 0 6px rgba(102,252,241,0.5), 0 0 12px rgba(255,46,99,0.25)',
              })}
            >
              {movie.Year}
            </span>
          </Button>
        </ListBoxItem>
      ))}
    </ListBox>
  );
};
