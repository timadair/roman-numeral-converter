import Fastify from "fastify";
import { toRomanNumeral } from "./converter";
import rTracer from "cls-rtracer";

const loggerOptions = {
  // Includes the x-request-id as traceId in all calls to request.log.
  mixin() {
    const id = rTracer.id();
    return id ? { traceId: id } : {};
  },
};

export function createServer() {
  const fastify = Fastify({
    logger: loggerOptions,
  });

  fastify.register(rTracer.fastifyPlugin, {
    useHeader: true,
    echoHeader: true,
    headerName: "X-Request-Id",
  });

  fastify.get("/romannumeral", (request, reply) => {
    request.log.info("Request received, beginning validation");
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
    const result = toRomanNumeral(query);
    return { input: queryParam, output: result };
  });
  return fastify;
}
