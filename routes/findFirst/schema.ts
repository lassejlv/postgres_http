import { z } from "zod";

export const schema = z.object({
  table: z.string(),
  where: z.any().optional(),
})
