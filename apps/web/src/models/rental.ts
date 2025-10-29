import { z } from 'zod';
import { idSchema, isoDate } from './common';
import { VhsSchema } from './vhs';
import { CustomerSchema } from './customer';

export const RentalSchema = z.object({
  id: idSchema,
  vhs: VhsSchema.or(z.string()),
  customer: CustomerSchema.or(z.string()),
  rentedAt: isoDate,
  dueDate: isoDate,
  returnedAt: isoDate.nullable().optional(),
});

export type Rental = z.infer<typeof RentalSchema>;

export const CreateRentalInput = z.object({
  vhsId: idSchema,
  customerId: idSchema,
});
export type CreateRentalInput = z.infer<typeof CreateRentalInput>;
