import { connection } from "../lib/mysql"
import { extratoSchema } from "../schemas/extrato"
import { z } from "zod"

interface EncontarExtratosRequest {
  imobiliariaId: string
  documento: string
  contrato: string
}

export async function encontrarExtratosService({
  imobiliariaId,
  documento,
  contrato
}: EncontarExtratosRequest) {
  const conn = await connection()
  const [resultado] = await conn.query(`
    SELECT * FROM trafego_boleto.extrato_raw
    WHERE imobiliaria_id = "${imobiliariaId}"
    AND  locador_cpf_cnpj = "${documento}"
    AND contrato = "${contrato.replace('-', '/')}"
    ORDER BY parcela DESC
    LIMIT 3
  `)

  const extratos = z.array(extratoSchema).parse(resultado)

  return { extratos }
}