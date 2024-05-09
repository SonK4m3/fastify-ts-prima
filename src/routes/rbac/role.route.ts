import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import PermissionRoleController from '../../controllers/permissionRole.controller';
import { $ref, ActiveRolesSchema, CreateRoleInputType } from '../../validators/role.schema';

const permissionRoleController: PermissionRoleController = new PermissionRoleController();

const roleRoutes = async (server: FastifyInstance) => {
  server.post(
    '/',
    {
      schema: {
        body: $ref('createRoleSchema'),
        response: {
          200: $ref('roleSchema'),
        },
      },
    },
    (request: FastifyRequest<{ Body: CreateRoleInputType }>, reply: FastifyReply) =>
      permissionRoleController.createRole(request, reply),
  );

  server.get(
    '/',
    {
      schema: {
        response: {
          200: $ref('roleResponsesSchema'),
        },
      },
      config: {
        allowedRoles: ['admin'],
      },
    },
    (request: FastifyRequest, reply: FastifyReply) => permissionRoleController.getAllRoles(request, reply),
  );

  server.put(
    '/active',
    {
      schema: {
        body: $ref('activeRolesSchema'),
        response: {
          200: $ref('roleResponsesSchema'),
        },
      },
    },
    (request: FastifyRequest<{ Body: ActiveRolesSchema }>, reply: FastifyReply) =>
      permissionRoleController.activeRoles(request, reply),
  );

  server.post(
    '/:roleId/permissions',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            roleId: {
              type: 'number',
            },
          },
          required: ['roleId'],
        },
      },
    },
    (request: FastifyRequest<{ Params: { roleId: number }; Body: { permissionId: number } }>, reply: FastifyReply) =>
      permissionRoleController.addPermissionToRole(request, reply),
  );

  server.delete(
    '/:roleId/permissions',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            roleId: {
              type: 'number',
            },
          },
          required: ['roleId'],
        },
      },
    },
    (request: FastifyRequest<{ Params: { roleId: number }; Body: { permissionId: number } }>, reply: FastifyReply) =>
      permissionRoleController.removePermissionFromRole(request, reply),
  );

  server.get(
    '/:roleId/permissions',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            roleId: {
              type: 'number',
            },
          },
          required: ['roleId'],
        },
      },
    },
    (request: FastifyRequest<{ Params: { roleId: number } }>, reply: FastifyReply) =>
      permissionRoleController.getPermissionsByRole(request, reply),
  );
};

export default roleRoutes;
