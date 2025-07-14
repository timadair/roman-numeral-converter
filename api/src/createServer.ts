import Fastify from "fastify";
import { toRomanNumeral } from "./converter";
import rTracer from "cls-rtracer";
import cors from "@fastify/cors";
import metricsPlugin from "fastify-metrics";

export function createServer() {
  // Pino automates request and response logging
  const loggerOptions = {
    // Includes the x-request-id as traceId in all calls to request.log.
    mixin() {
      const id = rTracer.id();
      return id ? { traceId: id } : {};
    },
  };

  const fastify = Fastify({ logger: loggerOptions });

  // creates an id for the request, separate from Pino's.  Uses X-Request-Id if it's present
  fastify.register(rTracer.fastifyPlugin, {
    useHeader: true,
    echoHeader: true,
    headerName: "X-Request-Id",
  });

  // Satisfies XSS requirements
  fastify.register(cors, {
    origin: "http://localhost:5173",
  });

  // Drop-in metrics endpoint for use by Grafana or Prometheus
  fastify.register(metricsPlugin, {
    endpoint: "/metrics",
  });

  // Exposes the main endpoint of the backend.
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
