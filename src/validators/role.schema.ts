import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

const roleCore = {
  name: z.string(),
  is_active: z.boolean(),
};

const roleSchema = z.object({
  id: z.number(),
  ...roleCore,
});

const createRoleSchema = z.object({
  name: z.string(),
});

const activeRolesSchema = z.array(roleSchema);
const roleResponsesSchema = z.array(roleSchema);

export type CreateRoleInputType = z.infer<typeof createRoleSchema>;
export type ActiveRolesSchema = z.infer<typeof activeRolesSchema>;

// Generate JSON schemas using fastify-zod
const { schemas: roleSchemas, $ref } = buildJsonSchemas(
  {
    roleSchema,
    createRoleSchema,
    activeRolesSchema,
    roleResponsesSchema,
  },
  { $id: 'roleSchemas' },
);

export { roleSchemas, $ref };
