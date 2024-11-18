import { z } from "zod";

export const contratoSchema = z.object({
  CONTRATO: z.string(),
  imovel_endereco: z.string()
})