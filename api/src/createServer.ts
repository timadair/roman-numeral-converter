import Fastify from "fastify";
import { toRomanNumeral } from "./converter";

export function createServer() {
  const fastify = Fastify();
  fastify.get("/romannumeral", (request, reply) => {
    const queryParam = (request.query as { query?: string }).query;
    const query = Number(queryParam);
    if (
      !queryParam ||
      isNaN(query) ||
      query < 1 ||
      query > 3999 ||
      !Number.isInteger(query)
    ) {
      return reply
        .status(400)
        .send({ error: "Query must be an integer between 1 and 3999" });
    }
    return { result: toRomanNumeral(query) };
  });
  return fastify;
}
