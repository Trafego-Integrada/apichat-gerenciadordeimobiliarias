import { z } from "zod";

export const extratoSchema = z.object({
  id: z.string(),
  parcela: z.number(),
  deposito: z.date(),
  extrato_total: z.number()
})