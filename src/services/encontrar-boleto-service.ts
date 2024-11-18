import { connection } from "../lib/mysql"
import { boletoSchema } from "../schemas/boleto"
import { z } from "zod"

interface EncontarBoletoRequest {
  imobiliariaId: string
  documento: string
}

export async function encontrarBoletoService({
  imobiliariaId,
  documento
}: EncontarBoletoRequest) {
  const conn = await connection()
  const [resultado] = await conn.query(
    `
      SELECT * FROM trafego_boleto.boleto
      WHERE bols_codl = "${imobiliariaId}"
      AND bols_cpf_cnpj = "${documento}"
      ORDER BY data_vencimen desc
      LIMIT 1
    `
  )

  const boletos = z.array(boletoSchema).parse(resultado)

  return boletos
}