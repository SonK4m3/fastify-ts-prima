import PermissionOnRoleRepository from '../repositories/permissionOnRole.repository';

class PermissionOnRoleService {
  private readonly repository: PermissionOnRoleRepository;

  constructor(repository: PermissionOnRoleRepository) {
    this.repository = repository;
  }

  async addPermissionToRole(roleId: number, permissionId: number, assignedBy: string) {
    return await this.repository.addPermissionToRole(roleId, permissionId, assignedBy);
  }

  async removePermissionFromRole(roleId: number, permissionId: number) {
    return await this.repository.removePermissionFromRole(roleId, permissionId);
  }

  async getPermissionsByRole(roleId: number) {
    return await this.repository.getPermissionsByRole(roleId);
  }
}

export default PermissionOnRoleService;
