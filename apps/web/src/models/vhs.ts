import {z} from "zod"
import {GenreEnum, idSchema, isoDate, VhsStatusEnum} from "./common"

export const VhsSchema = z.object({
  id: idSchema,
  title: z.string().min(1),
  year: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
  genres: z.array(GenreEnum).default([]),
  synopsis: z.string().optional(),
  coverUrl: z.url(),
  status: VhsStatusEnum.default("disponible"),
  createdAt: isoDate,
  updatedAt: isoDate,
})

export type Vhs = z.infer<typeof VhsSchema>

export const CreateVhsInput = VhsSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export type CreateVhsInput = z.infer<typeof CreateVhsInput>

export const UpdateVhsInput = VhsSchema.partial().extend({ id: idSchema })
export type UpdateVhsInput = z.infer<typeof UpdateVhsInput>
