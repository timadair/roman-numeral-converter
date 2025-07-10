import { createServer } from "./createServer";

const fastify = createServer();

fastify.listen({ port: 8080 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
