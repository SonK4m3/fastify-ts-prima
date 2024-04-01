import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserInput, LoginInput } from '../validators/user.schema';
import { verifyPassword } from '../utils/hash';
import UserRepository from '../repositories/user.repository';
import UserService from '../services/user.services';

const userRepository: UserRepository = new UserRepository();
const userService: UserService = new UserService(userRepository);

class UserController {
  constructor() {}

  async registerUserHandler(request: FastifyRequest<{ Body: CreateUserInput }>, reply: FastifyReply) {
    const body = request.body;

    const user = await userService.createUser(body);
    return reply.code(201).send(user);
  }

  async signupHandler(request: FastifyRequest<{ Body: CreateUserInput }>, reply: FastifyReply) {
    const body = request.body;

    const user = await userService.createUser(body);

    const { password, salt, ...rest } = user;
    const token = await reply.jwtSign(rest);
    return {
      accessToken: token,
    };
  }

  async loginHandler(request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) {
    const body = request.body;

    const user = await userService.findUserByEmail(body.email);
    if (!user) {
      return reply.code(401).send({
        code: 'NOT_FOUND',
        message: 'Email does not register!',
      });
    }

    const correctPassword = verifyPassword({
      candidatePassword: body.password,
      salt: user.salt,
      hash: user.password,
    });

    if (correctPassword) {
      const { password, salt, ...rest } = user;
      const token = await reply.jwtSign(rest);
      return {
        accessToken: token,
      };
    }

    return reply.code(401).send({
      code: 'INVALID',
      message: 'Invalid password',
    });
  }

  async getUsersHandler() {
    const users = await userService.findUsers();

    return users;
  }
}

export default UserController;
