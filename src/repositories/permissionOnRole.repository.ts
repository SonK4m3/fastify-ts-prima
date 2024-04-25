import prisma from '../prisma';

class PermissionOnRoleRepository {
  constructor() {}

  async addPermissionToRole(roleId: number, permissionId: number, assignedBy: string) {
    return await prisma.nhs_permissions_on_roles.create({
      data: {
        roleId,
        permissionId,
        assignedBy,
      },
    });
  }

  async removePermissionFromRole(roleId: number, permissionId: number) {
    return await prisma.nhs_permissions_on_roles.deleteMany({
      where: {
        roleId,
        permissionId,
      },
    });
  }

  async getPermissionsByRole(roleId: number) {
    return await prisma.nhs_permissions_on_roles.findMany({
      where: {
        roleId: roleId,
      },
      include: {
        role: {
          select: {
            name: true,
          },
        },
        permission: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}

export default PermissionOnRoleRepository;
