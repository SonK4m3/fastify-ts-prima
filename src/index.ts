import fastify from "fastify";

const server = fastify();

server.get("/", (request, reply) => {
  return "Hello world!";
});

server.listen({ port: 8080, host: "127.0.0.1" }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log(`Server listening on ${address}`);
});
