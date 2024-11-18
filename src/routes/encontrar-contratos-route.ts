import { encontrarContratosService } from "../services/encontrar-contratos-service"
import { FastifyInstance } from "fastify"
import { z } from "zod"

export async function encontrarContratosRoute(app: FastifyInstance) {
  app.get('/imobiliaria/:id/proprietario/:documento/contratos', async (request, response) => {
    const paramsSchema = z.object({
      id: z.string(),
      documento: z.string()
    })

    const { id, documento } = paramsSchema.parse(request.params)

    try {
      const { contratos } = await encontrarContratosService({ documento, imobiliariaId: id })

      if (contratos.length === 0) {
        return response.send({ result: 'Contrato não encontrado' })
      }

      return response.send({ contratos, result: 'ok' })
    } catch (error: any) {
      response.send({ result: error.message })
    }
  })
}