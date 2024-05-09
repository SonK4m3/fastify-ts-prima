import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

const permissionCore = {
  name: z.string(),
  is_active: z.boolean(),
};

const permissionSchema = z.object({
  id: z.number(),
  ...permissionCore,
});

const createPermissionSchema = z.object({
  ...permissionCore,
});

export type CreatePermissionInputType = z.infer<typeof createPermissionSchema>;

// Generate JSON schemas using fastify-zod
const { schemas: permissionSchemas, $ref } = buildJsonSchemas(
  {
    permissionSchema,
    createPermissionSchema,
  },
  { $id: 'permissionSchema' },
);

export { permissionSchemas, $ref };
