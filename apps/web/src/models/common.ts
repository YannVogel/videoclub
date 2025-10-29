import { z } from 'zod';

export const idSchema = z.uuidv7();

export const isoDate = z.iso.datetime({ offset: true });
export const isoDateNullable = isoDate.nullable();

export const GenreEnum = z.enum([
  'action',
  'aventure',
  'animation',
  'comedie',
  'drame',
  'fantastique',
  'horreur',
  'policier',
  'romance',
  'science-fiction',
  'thriller',
  'autre',
]);
export type Genre = z.infer<typeof GenreEnum>;

export const VhsStatusEnum = z.enum(['available', 'rented', 'overdue', 'lost']);
export type VhsStatus = z.infer<typeof VhsStatusEnum>;
