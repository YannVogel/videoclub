import { z } from 'zod';

export const CustomerSchema = z.object({
  id: z.uuidv7(),
  firstName: z.string().min(1, 'Le prénom est obligatoire'),
  lastName: z.string().min(1, 'Le nom est obligatoire'),
  email: z.email('Adresse e-mail invalide'),
  phone: z.string().optional().nullable(),
  createdAt: z.iso.datetime(),
});

export type Customer = z.infer<typeof CustomerSchema>;
