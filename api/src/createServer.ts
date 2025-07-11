import Fastify from "fastify";
import { toRomanNumeral } from "./converter";
import { IncomingHttpHeaders } from "http";

/**
 * Use existing request ID if provided, otherwise generate one
 */
function getRequestIdForTracing(headers: IncomingHttpHeaders): string {
  const h = headers["x-request-id"];
  return typeof h === "string"
    ? h
    : Array.isArray(h)
      ? h[0]
      : crypto.randomUUID();
}

export function createServer() {
  const fastify = Fastify({
    logger: true,
    genReqId: (req) => getRequestIdForTracing(req.headers),
  });
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
    const result = toRomanNumeral(query);
    return { input: queryParam, output: result };
  });
  return fastify;
}
