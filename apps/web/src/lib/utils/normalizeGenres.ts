import { Vhs } from '@/models';

const genreMap: Record<string, Vhs['genres'][number]> = {
  Action: 'action',
  Adventure: 'aventure',
  Animation: 'animation',
  Comedy: 'comedie',
  Drama: 'drame',
  Fantasy: 'fantastique',
  Horror: 'horreur',
  Crime: 'policier',
  Romance: 'romance',
  'Sci-Fi': 'science-fiction',
  Thriller: 'thriller',
};

export const normalizeGenres = (input: string[]): Vhs['genres'] => {
  return input
    .map((g) => genreMap[g] || 'autre')
    .filter((g): g is Vhs['genres'][number] => Boolean(g));
};
