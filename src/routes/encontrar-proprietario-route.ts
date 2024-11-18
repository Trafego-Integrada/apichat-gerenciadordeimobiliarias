import { encontrarProprietarioService } from "../services/encontrar-proprietario-service";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function encontrarProprietarioRoute(app: FastifyInstance) {
  app.get('/imobiliaria/:id/proprietario/:documento', async (request, response) => {
    const paramsSchema = z.object({
      id: z.string(),
      documento: z.string()
    })

    const { id, documento } = paramsSchema.parse(request.params)

    try {
      const { proprietarios } = await encontrarProprietarioService({ imobiliariaId: id, documento })

      if (proprietarios.length === 0) {
        return response.send({ result: 'Proprietario não encontrado' })
      }

      const [{ nome_razao }] = proprietarios

      response.send({ nome_razao, result: 'ok' })
    } catch (error: any) {
      response.send({ result: error.message })
    }
  })
}