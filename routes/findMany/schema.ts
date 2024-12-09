import { z } from "zod"


export const findManySchema = z.object({
  table: z.string(),
  where: z.any().optional(),
  limit: z.number().default(20).optional(),
})
