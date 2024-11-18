import fastify from "fastify";
import { routes } from "./routes";

const app = fastify()

app.register(routes)

export const ISO_DATE_REGEX = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/

app.listen({
  port: 3333
})
  .then(() => console.log('Server is running'))