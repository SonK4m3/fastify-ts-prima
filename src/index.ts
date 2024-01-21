import fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from "@fastify/jwt";
import userRoutes from "./modules/user/user.route";
import productRoutes from "./modules/product/product.route";
import { userSchemas } from "./modules/user/user.schema";
import { productSchemas } from "./modules/product/product.schema";
import { bookSchemas } from "./modules/book/book.schema";
import { bookRoutes } from "./modules/book/book.route";

export const server = fastify();

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

interface IQuerystring {
  username: string;
  password: string;
}

interface IHeaders {
  "h-Custom": string;
}

interface IReply {
  200: { success: boolean };
  302: { url: string };
  "4xx": { error: string };
}

server.get("/healthcheck", async () => {
  return {
    status: "OK",
  };
});

server.get<{
  Querystring: IQuerystring;
  Headers: IHeaders;
  Reply: IReply;
}>(
  "/auth",
  {
    preValidation: (request, reply, done) => {
      const { username, password } = request.query;
      done(username !== "admin" ? new Error("Must be admin") : undefined);
    },
  },
  async (request, reply) => {
    const customerHeader = request.headers["h-Custom"];

    reply.status(200).send({ success: true });
  }
);

server.get("/ping", (request, reply) => {
  return "pong\n";
});

for (const schema of [...userSchemas, ...productSchemas, ...bookSchemas]) {
  server.addSchema(schema);
}

server.register(userRoutes, { prefix: "api/users" });
server.register(productRoutes, { prefix: "api/products" });
server.register(bookRoutes, { prefix: "api/books" });

server.listen({ port: 8080, host: "127.0.0.1" }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log(`Server listening on ${address}`);
});
