import { hashPassword } from '../utils/hash';
import { CreateUserInput } from '../validators/user.schema';
import UserRepository from '../repositories/user.repository';

class UserService {
  constructor(readonly userRepository: UserRepository) {
  }

  async createUser(input: CreateUserInput) {
    const { password, ...rest } = input;
    const { hash, salt } = hashPassword(password);

    const user = await this.userRepository.createUser({ ...rest, salt, password: hash });
    return user;
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findUserByEmail(email);
  }

  async findUsers() {
    return await this.userRepository.getUsers();
  }
}

export default UserService;
