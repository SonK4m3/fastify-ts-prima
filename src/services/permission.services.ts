import PermissionRepository from '../repositories/permission.repository';
import { CreatePermissionInputType } from '../validators/permission.schema';

class PermissionService {
  constructor(readonly permissionRepository: PermissionRepository) {}

  async createPermission(permission: CreatePermissionInputType) {
    return await this.permissionRepository.createPermission(permission);
  }

  async findById(key: number) {
    return await this.permissionRepository.getPermissionById(key);
  }

  async getAllPermissions() {
    return await this.permissionRepository.getAllPermissions();
  }
}

export default PermissionService;
