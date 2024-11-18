import { connection } from "../lib/mysql"
import { contratoSchema } from "../schemas/contrato"
import { z } from "zod"

interface EncontarContratosRequest {
  imobiliariaId: string
  documento: string
}

export async function encontrarContratosService({
  imobiliariaId,
  documento
}: EncontarContratosRequest) {
  const conn = await connection()
  const [resultado] = await conn.query(`
    SELECT distinct(contrato) as CONTRATO, imovel_endereco
    FROM extrato_raw e
    WHERE e.imobiliaria_id = "${imobiliariaId}"
    AND e.locador_cpf_cnpj = "${documento}"  
`)

  const contratos = z.array(contratoSchema).parse(resultado)

  return { contratos }
}