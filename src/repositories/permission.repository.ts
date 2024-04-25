import prisma from '../prisma';
import { CreatePermissionInputType } from '../validators/permission.schema';

class PermissionRepository {
  constructor() {}
  async createPermission(permissionData: CreatePermissionInputType) {
    return await prisma.nhs_permission.create({
      data: permissionData,
    });
  }

  // Get all permissions
  async getAllPermissions() {
    return await prisma.nhs_permission.findMany();
  }

  // Get permission by ID
  async getPermissionById(permissionId: number) {
    return await prisma.nhs_permission.findUnique({
      where: { id: permissionId },
    });
  }

  // Update permission by ID
  async updatePermission(permissionId: number, permissionData: Partial<CreatePermissionInputType>) {
    return await prisma.nhs_permission.update({
      where: { id: permissionId },
      data: permissionData,
    });
  }

  // Delete permission by ID
  async deletePermission(permissionId: number) {
    return await prisma.nhs_permission.delete({
      where: { id: permissionId },
    });
  }
}

export default PermissionRepository;
