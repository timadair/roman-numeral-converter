import Fastify from "fastify";
import { toRomanNumeral } from "./converter";
import rTracer from "cls-rtracer";
import crypto from "crypto";

export function createServer() {
  const fastify = Fastify({
    logger: true,
    // Override Fastify's internal reqId generation with x-request-id || UUID.
    // Should be good enough for a start, as this project doesn't make any outbound calls.
    // When better tracing is required, look into the Trace Context spec, specifically traceparent.
    genReqId: () => {
      const id = rTracer.id();
      return id !== undefined ? String(id) : crypto.randomUUID();
    },
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
