import { format } from "date-fns"
import { encontrarExtratosService } from "../services/encontrar-extratos-service"
import { FastifyInstance } from "fastify"
import { z } from "zod"

export async function encontrarExtratosRoute(app: FastifyInstance) {
  app.get('/imobiliaria/:id/proprietario/:documento/contrato/:contrato/extrato-url', async (request, response) => {
    const paramsSchema = z.object({
      id: z.string(),
      documento: z.string(),
      contrato: z.string()
    })

    const { id, documento, contrato } = paramsSchema.parse(request.params)

    try {
      const { extratos } = await encontrarExtratosService({ contrato, documento, imobiliariaId: id })

      if (extratos.length === 0) {
        return response.send({ result: 'Extrato não encontrado' })
      }

      response.send(extratos.map(({ id, deposito, extrato_total, ...contrato }) => {
        const extrato_url = process.env.EXTRATO_URL + id
        const data_deposito = format(deposito, 'dd/MM/yyyy')
        const valor_total = extrato_total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

        return { ...contrato, id, data_deposito, valor_total, extrato_url, result: 'ok' }
      }))
    } catch (error: any) {
      return response.send({ result: error.message })
    }
  })

}