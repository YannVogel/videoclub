import {z} from "zod"
import {idSchema, isoDate} from "./common"

export const ClientSchema = z.object({
  id: idSchema,
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  isActive: z.boolean().default(true),
  createdAt: isoDate,
  updatedAt: isoDate,
})

export type Client = z.infer<typeof ClientSchema>

export const CreateClientInput = ClientSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export type CreateClientInput = z.infer<typeof CreateClientInput>

export const UpdateClientInput = ClientSchema.partial().extend({ id: idSchema })
export type UpdateClientInput = z.infer<typeof UpdateClientInput>
