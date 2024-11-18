import { connection } from "../lib/mysql"
import { clienteSchema } from "../schemas/cliente"
import { z } from "zod"

interface EncontarInquilinoRequest {
  imobiliariaId: string
  documento: string
}

export async function encontrarInquilinoService({
  imobiliariaId,
  documento
}: EncontarInquilinoRequest) {
  const conn = await connection()
  const [resultado] = await conn.query(
    `
      SELECT p.nome_razao
      FROM contrato c LEFT JOIN perfil p on c.inquilino_id = p.cpf_cnpj
      WHERE c.imobiliaria_id = "${imobiliariaId}"
      AND c.inquilino_id = "${documento}"
      LIMIT 1
    `
  )

  const inquilinos = z.array(clienteSchema).parse(resultado)

  return { inquilinos }
}