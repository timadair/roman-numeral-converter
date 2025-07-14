import { createServer } from "./createServer";
import path from "path";
import fastifyStatic from "@fastify/static";

const fastify = createServer();

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
});

fastify.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
