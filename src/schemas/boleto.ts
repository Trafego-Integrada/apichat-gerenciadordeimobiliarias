import { z } from "zod";

export const boletoSchema = z.object({
  id: z.string(),
  data_vencimen: z.string(),
  valor_doc2: z.string(),
  linha_digitavel: z.string()
})