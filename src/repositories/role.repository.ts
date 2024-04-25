import prisma from '../prisma';
import { CreateRoleInputType } from '../validators/role.schema';

class RoleRepository {
  constructor() {}

  async createRole(roleData: CreateRoleInputType) {
    return await prisma.nhs_role.create({
      data: roleData,
    });
  }

  async getAllRoles() {
    return await prisma.nhs_role.findMany();
  }

  async getRoleById(roleId: number) {
    return await prisma.nhs_role.findUnique({
      where: { id: roleId },
    });
  }

  async updateRole(roleId: number, roleData: Partial<CreateRoleInputType>) {
    return await prisma.nhs_role.update({
      where: { id: roleId },
      data: roleData,
    });
  }

  async deleteRole(roleId: number) {
    return await prisma.nhs_role.delete({
      where: { id: roleId },
    });
  }
}

export default RoleRepository;
