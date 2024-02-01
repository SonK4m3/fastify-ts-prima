import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import UserController from '../controllers/user.controller';
import { $ref, CreateUserInput, LoginInput } from '../validators/user.schema';

const userController = new UserController();
const userRoutes = async (server: FastifyInstance) => {
  server.post(
    '/',
    { schema: { body: $ref('createUserSchema'), response: { 201: $ref('createUserResponseSchema') } } },
    (request: FastifyRequest<{ Body: CreateUserInput }>, reply: FastifyReply) =>
      userController.registerUserHandler(request, reply),
  );

  server.post(
    '/login',
    { schema: { body: $ref('loginSchema'), response: { 200: $ref('loginResponseSchema') } } },
    (request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) => userController.loginHandler(request, reply),
  );

  server.get('/', { preHandler: [server.authenticate] }, userController.getUsersHandler);
};

export default userRoutes;
