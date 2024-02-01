import { FastifyRequest, FastifyReply } from 'fastify';

type Role = 'admin' | 'user';

const authorizeAccess = (role: Role[]) => async (request: FastifyRequest, reply: FastifyReply) => {};

export { authorizeAccess };
