'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMovieDetails, searchMovies } from '@/lib/external/omdb';
import { VhsCreate } from '@/components/api/VhsCreate';
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
    <main className={css({ p: 6 })}>
      <h1
        className={css({
          fontSize: '3xl',
          fontWeight: 'bold',
          background:
            'linear-gradient(90deg, #ff4df0, #00e0ff, #ffe38a, #ff4df0)',
          backgroundClip: 'text',
          color: 'transparent',
        })}
      >
        Ajouter une VHS
      </h1>

      {/* Champ de recherche */}
      <div className={hstack({ gap: 3, alignItems: 'center' })}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un film..."
          className={css({
            p: 2,
            w: '300px',
            rounded: 'md',
            bg: 'gray.900',
            border: '1px solid gray',
            color: 'white',
          })}
        />
        <button
          onClick={handleSearch}
          className={css({
            bg: 'blue.600',
            px: 4,
            py: 2,
            rounded: 'md',
            color: 'white',
            fontWeight: 'semibold',
            _hover: { bg: 'blue.500' },
          })}
        >
          Rechercher
        </button>
      </div>

      {/* Résultats */}
      <MovieSearchResults
        results={results}
        selected={selected}
        onSelect={handleSelect}
      />

      {/* Formulaire */}
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
                gap: 4,
                alignItems: 'flex-start',
                bg: 'gray.900',
                p: 6,
                rounded: 'xl',
                borderWidth: 1,
                borderColor: 'gray.800',
                w: 'full',
                maxW: 'lg',
              })}
            >
              <img
                src={form.coverUrl}
                alt={form.title}
                className={css({ w: '200px', h: 'auto', borderRadius: 'md' })}
              />
              <div>
                <label className={css({ display: 'block', mb: 1 })}>
                  Titre :
                </label>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  className={css({
                    p: 2,
                    w: 'full',
                    rounded: 'md',
                    bg: 'gray.800',
                    borderWidth: 1,
                    borderColor: 'gray.700',
                    color: 'white',
                  })}
                />
              </div>

              <div>
                <label className={css({ display: 'block', mb: 1 })}>
                  Synopsis :
                </label>
                <textarea
                  value={form.synopsis}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, synopsis: e.target.value }))
                  }
                  rows={5}
                  className={css({
                    p: 2,
                    w: 'full',
                    rounded: 'md',
                    bg: 'gray.800',
                    borderWidth: 1,
                    borderColor: 'gray.700',
                    color: 'white',
                  })}
                />
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
                  _hover: { bg: 'blue.500' },
                  _disabled: { opacity: 0.6 },
                })}
              >
                {isPending ? 'Création...' : 'Créer la VHS'}
              </button>

              {!!error && (
                <p className={css({ color: 'red.400' })}>
                  Une erreur est survenue.
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
