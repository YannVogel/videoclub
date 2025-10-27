import {z} from "zod"
import {idSchema, isoDate, isoDateNullable} from "./common"

export const RentalSchema = z.object({
  id: idSchema,
  vhsId: idSchema,
  clientId: idSchema,
  rentedAt: isoDate,
  dueAt: isoDate,
  returnedAt: isoDateNullable,
})

export type Rental = z.infer<typeof RentalSchema>

export const CreateRentalInput = RentalSchema.omit({
  id: true,
  returnedAt: true,
})
export type CreateRentalInput = z.infer<typeof CreateRentalInput>

export const ReturnRentalInput = z.object({
  id: idSchema,
  returnedAt: isoDate,
})
export type ReturnRentalInput = z.infer<typeof ReturnRentalInput>
