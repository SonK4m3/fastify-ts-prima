import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

const roleCore = {
  name: z.string(),
};

const roleSchema = z.object({
  id: z.number(),
  ...roleCore,
});

const createRoleSchema = z.object({
  ...roleCore,
});

export type CreateRoleInputType = z.infer<typeof createRoleSchema>;

// Generate JSON schemas using fastify-zod
const { schemas: roleSchemas, $ref } = buildJsonSchemas(
  {
    roleSchema,
    createRoleSchema,
  },
  { $id: 'roleSchemas' },
);

export { roleSchemas, $ref };
