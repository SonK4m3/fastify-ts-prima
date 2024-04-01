import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import UserController from '../controllers/auth.controller';
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
    '/signup',
    { schema: { body: $ref('createUserSchema'), response: { 201: $ref('loginResponseSchema') } } },
    (request: FastifyRequest<{ Body: CreateUserInput }>, reply: FastifyReply) =>
      userController.signupHandler(request, reply),
  );

  server.post(
    '/login',
    { schema: { body: $ref('loginSchema'), response: { 200: $ref('loginResponseSchema') } } },
    (request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) => userController.loginHandler(request, reply),
  );

  server.get(
    '/',
    {
      config: {
        allowedRoles: ['admin'],
      },
      preHandler: [server.authenticate, server.authorize],
    },
    userController.getUsersHandler,
  );
};

export default userRoutes;
