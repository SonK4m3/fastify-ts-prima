import RoleRepository from '../repositories/role.repository';
import { ActiveRolesSchema, CreateRoleInputType } from '../validators/role.schema';

class RoleService {
  constructor(readonly roleRepository: RoleRepository) {}

  async findById(key: number) {
    return await this.roleRepository.getRoleById(key);
  }

  async getAllRoles() {
    return await this.roleRepository.getAllRoles();
  }

  async createRole(data: CreateRoleInputType) {
    return await this.roleRepository.createRole(data);
  }

  async activeRole(data: ActiveRolesSchema) {
    return await this.roleRepository.activeRoles(data);
  }
}

export default RoleService;
