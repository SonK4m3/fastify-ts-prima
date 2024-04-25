import { FastifyReply, FastifyRequest } from 'fastify';
import PermissionRepository from '../repositories/permission.repository';
import RoleRepository from '../repositories/role.repository';
import PermissionService from '../services/permission.services';
import RoleService from '../services/role.services';
import { CreatePermissionInputType } from '../validators/permission.schema';
import { CreateRoleInputType } from '../validators/role.schema';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import PermissionOnRoleRepository from '../repositories/permissionOnRole.repository';
import PermissionOnRoleService from '../services/permissionOnRole.services';

const permissionRepository: PermissionRepository = new PermissionRepository();
const permissionService: PermissionService = new PermissionService(permissionRepository);

const roleRepository: RoleRepository = new RoleRepository();
const roleService: RoleService = new RoleService(roleRepository);

const permissionOnRoleRepository: PermissionOnRoleRepository = new PermissionOnRoleRepository();
const permissionOnRoleService: PermissionOnRoleService = new PermissionOnRoleService(permissionOnRoleRepository);

class PermissionRoleController {
  constructor() {}

  async createPermission(request: FastifyRequest<{ Body: CreatePermissionInputType }>, reply: FastifyReply) {
    try {
      const permissionData = request.body;
      const newPermission = await permissionService.createPermission(permissionData);
      reply.code(201).send(newPermission);
    } catch (error: any) {
      throw new PrismaClientKnownRequestError('Failed to create permission', error);
    }
  }

  // Get all permissions
  async getAllPermissions(request: FastifyRequest, reply: FastifyReply) {
    try {
      const permissions = await permissionRepository.getAllPermissions();
      reply.send(permissions);
    } catch (error) {
      throw new PrismaClientKnownRequestError('Failed to fetch permissions', error as any);
    }
  }

  async createRole(request: FastifyRequest<{ Body: CreateRoleInputType }>, reply: FastifyReply) {
    try {
      const roleData = request.body;
      const newRole = await roleService.createRole(roleData);
      reply.code(201).send(newRole);
    } catch (error) {
      throw new PrismaClientKnownRequestError('Failed to create role', error as any);
    }
  }

  // Get all permissions
  async getAllRoles(request: FastifyRequest, reply: FastifyReply) {
    try {
      const roles = await roleService.getAllRoles();
      reply.send(roles);
    } catch (error) {
      throw new PrismaClientKnownRequestError('Failed to fetch role', error as any);
    }
  }

  async addPermissionToRole(
    request: FastifyRequest<{ Params: { roleId: number }; Body: { permissionId: number } }>,
    reply: FastifyReply,
  ) {
    const { permissionId } = request.body;
    const assignedBy = request.user.name;
    const { roleId } = request.params;

    try {
      const newPermissionOnRole = await permissionOnRoleService.addPermissionToRole(roleId, permissionId, assignedBy);
      reply.code(201).send({
        success: true,
        message: 'Permission added to role successfully',
        newPermissionOnRole: newPermissionOnRole,
      });
    } catch (error) {
      throw new PrismaClientKnownRequestError('Failed to add permission to role', error as any);
    }
  }

  async removePermissionFromRole(
    request: FastifyRequest<{ Params: { roleId: number }; Body: { permissionId: number } }>,
    reply: FastifyReply,
  ) {
    const { roleId } = request.params;
    const { permissionId } = request.body;

    try {
      await permissionOnRoleService.removePermissionFromRole(roleId, permissionId);
      reply.code(201).send({ success: true, message: 'Permission removed from role successfully' });
    } catch (error) {
      throw new Error('Failed to remove permission from role');
    }
  }

  async getPermissionsByRole(request: FastifyRequest<{ Params: { roleId: number } }>, reply: FastifyReply) {
    try {
      const { roleId } = request.params;

      const permissions = await permissionOnRoleService.getPermissionsByRole(roleId);
      return { success: true, permissions };
    } catch (error) {
      throw new Error('Failed to fetch permissions for role');
    }
  }
}

export default PermissionRoleController;
