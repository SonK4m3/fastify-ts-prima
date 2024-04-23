import fastify from 'fastify';
import routes from './routes';
import authenticatePlugin from './plugins/authenticate.plugin';
import authorizationPlugin from './plugins/authorization.plugin';
import corsPlugin from './plugins/cors.plugin';
import { Permission, Role } from './models/role';
import { RecordErrorHandler } from './errorHandlers/RecordErrorHandler';
import { User } from './models/user';

const server = fastify({
  logger: false,
});

declare module 'fastify' {
  type Authenticate = (request: FastifyRequest, reply: FastifyReply) => Promise<void>;

  type Authorize = (request: FastifyRequest, reply: FastifyReply) => void;

  export interface FastifyInstance {
    authenticate: Authenticate;
    authorize: any;
    permission: any;
  }

  interface FastifyContextConfig {
    allowedRoles?: Array<Role>;
    permission?: Permission;
  }
}

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: User;
  }
}

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString();
};

// plugins
server.register(authenticatePlugin);
server.register(authorizationPlugin);
server.register(corsPlugin, {
  origin: [String(process.env.ORIGIN)],
  methods: ['GET', 'POST', 'PUT'],
});

server.setErrorHandler((error, request, reply) => {
  RecordErrorHandler.handle(error, request, reply);
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
