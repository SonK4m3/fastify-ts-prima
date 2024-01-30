import fastify, { FastifyReply, FastifyRequest, errorCodes } from "fastify";
import fastifyJwt from "@fastify/jwt";
import routes from "./routes";

export const server = fastify({
  logger: false,
});

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}

server.register(fastifyJwt, {
  secret: "sonkameSecret",
});

server.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (e) {
      return reply.send(e);
    }
  }
);

server.setErrorHandler((error, request, reply) => {
  if (error instanceof errorCodes.FST_ERR_BAD_STATUS_CODE) {
    server.log.error(error);
    reply.status(500).send({ message: "Server internal error!" });
  } else {
    reply.send(error);
  }
});

server.register(routes, { prefix: "/api" });

server.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log(`Server listening on ${address}`);
});
