import { encontrarBoletoService } from "../services/encontrar-boleto-service";
import { encontrarInquilinoService } from "../services/encontrar-inquilino-service";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function encontrarBoletoRoute(app: FastifyInstance) {
  app.get('/imobiliaria/:id/cliente/:documento/boleto-url', async (request, response) => {
    const paramsSchema = z.object({
      id: z.string(),
      documento: z.string()
    })

    const { id, documento } = paramsSchema.parse(request.params)

    try {
      const { inquilinos } = await encontrarInquilinoService({ imobiliariaId: id, documento })

      if (inquilinos.length === 0) {
        return response.status(400).send('Cliente não encontrado')
      }

      const boletos = await encontrarBoletoService({ imobiliariaId: id, documento })

      if (boletos.length === 0) {
        return response.status(400).send('Boleto não encontrado')
      }

      const { id: boletoId, data_vencimen, linha_digitavel, valor_doc2 } = boletos[0]
      const url = process.env.BOLETO_URL + boletoId

      const valor_brasileiro = Number(valor_doc2).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

      response.send({ url, data_vencimen, linha_digitavel, valor: valor_brasileiro })
    } catch (error: any) {
      response.status(500).send(error.message)
    }
  })
}