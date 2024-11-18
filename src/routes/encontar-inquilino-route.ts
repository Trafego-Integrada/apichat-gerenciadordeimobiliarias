import { encontrarInquilinoService } from "../services/encontrar-inquilino-service";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function encontrarInquilinoRoute(app: FastifyInstance) {
  app.get('/imobiliaria/:id/Inquilino/:documento', async (request, response) => {
    const paramsSchema = z.object({
      id: z.string(),
      documento: z.string()
    })

    const { id, documento } = paramsSchema.parse(request.params)

    try {
      const { inquilinos } = await encontrarInquilinoService({ imobiliariaId: id, documento })

      if (inquilinos.length === 0) {
        return response.status(400).send('Inquilino não encontrado')
      }

      const [{ nome_razao }] = inquilinos

      response.send({ nome_razao })
    } catch (error: any) {
      response.status(500).send(error.message)
    }
  })
}