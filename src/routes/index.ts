import { FastifyInstance } from "fastify";
import { encontrarInquilinoRoute } from "./encontar-inquilino-route";
import { encontrarBoletoRoute } from "./encontrar-boleto-route";
import { encontrarContratosRoute } from "./encontrar-contratos-route";
import { encontrarExtratosRoute } from "./encontrar-extratos-route";
import { encontrarProprietarioRoute } from "./encontrar-proprietario-route";

export async function routes(app: FastifyInstance) {
  app.register(encontrarInquilinoRoute)
  app.register(encontrarProprietarioRoute)
  app.register(encontrarBoletoRoute)
  app.register(encontrarContratosRoute)
  app.register(encontrarExtratosRoute)
}