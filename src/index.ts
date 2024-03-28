import fastify, { errorCodes } from 'fastify';
import routes from './routes';
import authenticatePlugin from './plugins/authenticate.plugin';
import authorizationPlugin from './plugins/authorization.plugin';
import corsPlugin from './plugins/cors.plugin';

export const server = fastify({
  logger: false,
});

declare module 'fastify' {
  type Authenticate = (request: FastifyRequest, reply: FastifyReply) => Promise<void>;

  type Authorize = (request: FastifyRequest, reply: FastifyReply) => Promise<void>;

  export interface FastifyInstance {
    authenticate: Authenticate;
    authorize: any;
  }

  interface FastifyContextConfig {
    allowedRoles?: string[];
  }
}

type Role = 'admin' | 'user';

interface User {
  id: number;
  email: string;
  name: string;
  role: Role;
}

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: User;
  }
}

// plugins
server.register(authenticatePlugin);
server.register(authorizationPlugin);
server.register(corsPlugin, {
  origin: [String(process.env.ORIGIN)],
  methods: ['GET', 'POST', 'PUT'],
});

server.setErrorHandler((error, request, reply) => {
  if (error instanceof errorCodes.FST_ERR_BAD_STATUS_CODE) {
    server.log.error(error);
    reply.status(500).send({ message: 'Server internal error!' });
  } else {
    reply.send(error);
  }
});

server.register(routes, { prefix: '/api' });

const PORT = Number(process.env.PORT) || 8080;
const HOST = process.env.HOST || 'localhost';

server.listen({ port: PORT, host: HOST }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log(`Server listening on ${address}`);
});
