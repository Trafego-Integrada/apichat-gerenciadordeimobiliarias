import { z } from "zod";

export const clienteSchema = z.object({
  nome_razao: z.string()
})