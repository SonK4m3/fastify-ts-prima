import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import PermissionRoleController from '../../controllers/permissionRole.controller';
import { $ref, CreatePermissionInputType } from '../../validators/permission.schema';

const permissoinRoleController: PermissionRoleController = new PermissionRoleController();

const roleRoutes = async (server: FastifyInstance) => {
  server.post(
    '/',
    {
      schema: {
        body: $ref('createPermissionSchema'),
        response: {
          200: $ref('permissionSchema'),
        },
      },
    },
    (request: FastifyRequest<{ Body: CreatePermissionInputType }>, reply: FastifyReply) =>
      permissoinRoleController.createPermission(request, reply),
  );

  server.get(
    '/',
    {
      config: {
        allowedRoles: [],
      },
    },
    (request: FastifyRequest, reply: FastifyReply) => permissoinRoleController.getAllPermissions(request, reply),
  );
};

export default roleRoutes;
