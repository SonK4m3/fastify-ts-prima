import prisma from '../utils/prisma';
import { CreateUserInput } from '../validators/user.schema';

class UserRepository {
  constructor() {}

  async createUser(input: CreateUserInput & { salt: string }) {
    return await prisma.user.create({
      data: { ...input },
    });
  }

  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getUsers() {
    return await prisma.user.findMany({
      select: {
        email: true,
        id: true,
        name: true,
        role: true,
      },
    });
  }
}

export default UserRepository;
