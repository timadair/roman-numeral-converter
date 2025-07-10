import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import { toRomanNumeral } from "./converter";
import request from "supertest"; // Make sure to install supertest: pnpm add -D supertest
import { describe, it, beforeAll, afterAll, expect } from "vitest";

describe("GET /romannumeral", () => {
  let fastify: ReturnType<typeof Fastify>;

  beforeAll(async () => {
    fastify = Fastify();
    // Register the route as in server.ts
    fastify.get(
      "/romannumeral",
      (request: FastifyRequest, reply: FastifyReply) => {
        const queryParam = (request.query as { query?: string }).query;
        const query = Number(queryParam);
        if (!queryParam || isNaN(query) || query < 1 || query > 3999) {
          return reply
            .status(400)
            .send({ error: "Query must be an integer between 1 and 3999" });
        }
        return { result: toRomanNumeral(query) };
      },
    );
    await fastify.listen({ port: 0 }); // random available port
  });

  afterAll(async () => {
    await fastify.close();
  });

  it("should return the correct Roman numeral for 42", async () => {
    const res = await request(fastify.server).get("/romannumeral?query=42");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ result: "XLII" });
  });

  it("should return 400 for query=0", async () => {
    const res = await request(fastify.server).get("/romannumeral?query=0");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: "Query must be an integer between 1 and 3999",
    });
  });

  it("should return 400 for query=-15", async () => {
    const res = await request(fastify.server).get("/romannumeral?query=-15");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: "Query must be an integer between 1 and 3999",
    });
  });

  it("should return 400 for query=4000", async () => {
    const res = await request(fastify.server).get("/romannumeral?query=4000");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: "Query must be an integer between 1 and 3999",
    });
  });
});
