import { createServer } from "./createServer";
import request from "supertest";
import { describe, it, beforeAll, afterAll, expect } from "vitest";

describe("GET /romannumeral", () => {
  let fastify: ReturnType<typeof createServer>;

  beforeAll(async () => {
    fastify = createServer();
    await fastify.listen({ port: 0 });
  });

  afterAll(async () => {
    await fastify.close();
  });

  it("should use JSON format for successful responses", async () => {
    const res = await request(fastify.server).get("/romannumeral?query=42");
    expect(res.status).toBe(200);
    expect(() => JSON.parse(res.text)).not.toThrow();
  });

  it("should return the correct Roman numeral for 42", async () => {
    const res = await request(fastify.server).get("/romannumeral?query=42");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ input: "42", output: "XLII" });
  });

  it("Nullum (zero) disallowed", async () => {
    const res = await request(fastify.server).get("/romannumeral?query=0");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: "Query must be an integer between 1 and 3999",
    });
  });

  it("Negatives disallowed", async () => {
    const res = await request(fastify.server).get("/romannumeral?query=-15");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: "Query must be an integer between 1 and 3999",
    });
  });

  it("Over 3,999 disallowed", async () => {
    const res = await request(fastify.server).get("/romannumeral?query=4000");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: "Query must be an integer between 1 and 3999",
    });
  });

  it("Commas disallowed", async () => {
    const res = await request(fastify.server).get("/romannumeral?query=1,234");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: "Query must be an integer between 1 and 3999",
    });
  });

  it("Periods disallowed", async () => {
    const res = await request(fastify.server).get("/romannumeral?query=1.234");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: "Query must be an integer between 1 and 3999",
    });
  });

  it("should echo X-Request-Id header in the response", async () => {
    const requestId = crypto.randomUUID();
    const res = await request(fastify.server)
      .get("/romannumeral?query=42")
      .set("X-Request-Id", requestId);
    expect(res.status).toBe(200);
    // Fastify lowercases all headers internally, so check for lowercase
    expect(res.headers["x-request-id"]).toBe(requestId);
  });

  it.skip("should include x-request-id when invoking request.log.$level()", async () => {
    // Verified manually, automating this would require injecting a listener into createServer.
    // Not worth the time at the moment.
  });
});
