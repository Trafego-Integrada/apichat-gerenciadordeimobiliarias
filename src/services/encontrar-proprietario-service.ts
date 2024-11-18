import { connection } from "../lib/mysql"
import { clienteSchema } from "../schemas/cliente"
import { z } from "zod"

interface EncontarProprietarioRequest {
  imobiliariaId: string
  documento: string
}

export async function encontrarProprietarioService({
  imobiliariaId,
  documento
}: EncontarProprietarioRequest) {
  const conn = await connection()
  const [resultado] = await conn.query(
    `
      SELECT nome_razao
      FROM usuario_proprietario 
      WHERE imobiliaria_id = "${imobiliariaId}"
      AND cpf_cnpj = "${documento}"
    `
  )

  const proprietarios = z.array(clienteSchema).parse(resultado)

  return { proprietarios }
}