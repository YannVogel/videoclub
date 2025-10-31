'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMovieDetails, searchMovies } from '@/lib/external/omdb';
import VhsCreate from '@/components/api/VhsCreate';
import { css } from '@styled-system/css';
import { hstack, vstack } from '@styled-system/patterns';
import { normalizeGenres } from '@/lib/utils/normalizeGenres';
import { Vhs } from '@/models';
import { MovieSearchResults } from '@/components/MovieSearchResults';

const VhsCreatePage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [form, setForm] = useState<{
    title: string;
    synopsis: string;
    coverUrl: string;
    year: string;
    genres: Vhs['genres'];
  }>({
    title: '',
    synopsis: '',
    coverUrl: '',
    year: '',
    genres: [],
  });

  const router = useRouter();

  const handleSearch = async () => {
    const res = await searchMovies(query);
    setResults(res);
  };

  const handleSelect = async (imdbID: string) => {
    const details = await getMovieDetails(imdbID);
    setSelected(details);
    setForm({
      title: details.Title || '',
      synopsis: details.Plot || '',
      coverUrl: details.Poster || '',
      year: details.Year || '',
      genres: normalizeGenres(
        details.Genre?.split(',').map((g: string) => g.trim()) || [],
      ),
    });
  };

  return (
    <main
      className={css({
        p: 8,
        maxW: '900px',
        mx: 'auto',
        fontFamily: "'IBM Plex Sans', sans-serif",
        color: '#e0e0e0',
      })}
    >
      <h1
        className={css({
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '3xl',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          mb: 8,
          background:
            'linear-gradient(90deg, #ff2e63, #66fcf1, #ffe38a, #ff2e63)',
          backgroundClip: 'text',
          color: 'transparent',
          textShadow:
            '0 0 8px rgba(255,46,99,0.45), 0 0 16px rgba(102,252,241,0.4)',
        })}
      >
        🎬 Ajouter une VHS
      </h1>

      {/* Barre de recherche */}
      <div
        className={hstack({
          gap: 3,
          alignItems: 'center',
          mb: 6,
        })}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un film..."
          className={css({
            p: 3,
            w: 'full',
            maxW: '400px',
            rounded: 'md',
            border: '1px solid rgba(255,255,255,0.15)',
            bg: 'rgba(20,20,25,0.8)',
            color: 'white',
            outline: 'none',
            fontSize: 'md',
            transition: 'all 0.2s ease',
            _focus: {
              borderColor: '#66fcf1',
              boxShadow: '0 0 10px rgba(102,252,241,0.3)',
            },
          })}
        />
        <button
          onClick={handleSearch}
          className={css({
            px: 5,
            py: 3,
            rounded: 'md',
            fontWeight: 'semibold',
            color: 'black',
            bg: 'linear-gradient(90deg, #66fcf1 0%, #ff2e63 100%)',
            boxShadow:
              '0 0 8px rgba(102,252,241,0.4), 0 0 16px rgba(255,46,99,0.4)',
            transition: 'transform 150ms ease, filter 150ms ease',
            _hover: {
              transform: 'translateY(-2px)',
              filter: 'brightness(1.2)',
            },
          })}
        >
          Rechercher
        </button>
      </div>

      <MovieSearchResults
        results={results}
        selected={selected}
        onSelect={handleSelect}
      />

      {selected && (
        <VhsCreate>
          {({ mutate, isPending, error }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                mutate(
                  {
                    ...form,
                    year: form.year
                      ? parseInt(form.year as string, 10)
                      : undefined,
                  },
                  {
                    onSuccess: () => router.push('/catalog'),
                  },
                );
              }}
              className={vstack({
                gap: 6,
                alignItems: 'stretch',
                w: 'full',
                maxW: 'lg',
                mx: 'auto',
                p: 8,
                rounded: '2xl',
                border: '1px solid rgba(255,255,255,0.1)',
                bg: 'linear-gradient(180deg, rgba(10,10,15,0.9), rgba(15,15,20,0.95))',
                boxShadow:
                  '0 0 25px rgba(102,252,241,0.08), 0 0 45px rgba(255,46,99,0.08)',
                position: 'relative',
                overflow: 'hidden',
                _before: {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  background:
                    'repeating-linear-gradient(to bottom, rgba(255,255,255,0.015) 0, rgba(255,255,255,0.015) 1px, transparent 2px, transparent 3px)',
                  pointerEvents: 'none',
                  zIndex: 1,
                },
              })}
            >
              {/* Cover preview */}
              <div
                className={hstack({
                  gap: 5,
                  justify: 'flex-start',
                  alignItems: 'center',
                })}
              >
                <img
                  src={form.coverUrl}
                  alt={form.title}
                  className={css({
                    w: '160px',
                    h: 'auto',
                    borderRadius: 'md',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow:
                      '0 0 10px rgba(255,46,99,0.4), 0 0 18px rgba(102,252,241,0.25)',
                  })}
                />
                <div
                  className={css({
                    fontSize: 'sm',
                    color: 'gray.400',
                    maxW: '60%',
                  })}
                >
                  <p>
                    <strong>Astuce :</strong> vérifiez les infos avant de créer
                    la VHS.
                  </p>
                  <p>
                    Vous pouvez encore modifier le titre ou le synopsis
                    ci-dessous.
                  </p>
                </div>
              </div>

              {/* Form fields */}
              <div className={vstack({ gap: 5, w: 'full', zIndex: 2 })}>
                <div>
                  <label
                    className={css({
                      display: 'block',
                      mb: 2,
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: 'sm',
                      color: '#66fcf1',
                      letterSpacing: 'wide',
                      textTransform: 'uppercase',
                    })}
                  >
                    Titre
                  </label>
                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, title: e.target.value }))
                    }
                    className={css({
                      p: 3,
                      w: 'full',
                      rounded: 'md',
                      bg: 'rgba(25,25,30,0.95)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white',
                      fontWeight: 'medium',
                      transition: 'all 0.2s ease',
                      _focus: {
                        borderColor: '#ff2e63',
                        boxShadow: '0 0 10px rgba(255,46,99,0.3)',
                      },
                    })}
                  />
                </div>

                <div>
                  <label
                    className={css({
                      display: 'block',
                      mb: 2,
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: 'sm',
                      color: '#66fcf1',
                      textTransform: 'uppercase',
                    })}
                  >
                    Synopsis
                  </label>
                  <textarea
                    value={form.synopsis}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, synopsis: e.target.value }))
                    }
                    rows={5}
                    className={css({
                      p: 3,
                      w: 'full',
                      rounded: 'md',
                      bg: 'rgba(25,25,30,0.95)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white',
                      lineHeight: 'tall',
                      fontSize: 'sm',
                      transition: 'all 0.2s ease',
                      _focus: {
                        borderColor: '#66fcf1',
                        boxShadow: '0 0 10px rgba(102,252,241,0.3)',
                      },
                    })}
                  />
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isPending}
                className={css({
                  alignSelf: 'center',
                  mt: 4,
                  px: 8,
                  py: 3,
                  cursor: 'pointer',
                  rounded: 'md',
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  color: 'black',
                  letterSpacing: 'wide',
                  bg: 'linear-gradient(90deg, #66fcf1 0%, #ff2e63 100%)',
                  boxShadow:
                    '0 0 15px rgba(102,252,241,0.6), 0 0 30px rgba(255,46,99,0.6)',
                  transition: 'transform 200ms ease, filter 150ms ease',
                  _hover: {
                    transform: 'translateY(-3px)',
                    filter: 'brightness(1.25)',
                  },
                  _disabled: { opacity: 0.5 },
                })}
              >
                {isPending ? '⏳ Création...' : '▶ Créer la VHS'}
              </button>

              {!!error && (
                <p
                  className={css({
                    color: '#ff2e63',
                    fontWeight: 'medium',
                    textAlign: 'center',
                    mt: 3,
                  })}
                >
                  ⚠️ Une erreur est survenue.
                </p>
              )}
            </form>
          )}
        </VhsCreate>
      )}
    </main>
  );
};

export default VhsCreatePage;
