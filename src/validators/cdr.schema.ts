import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const cdrIdSchema = z.object({
  id: z.number(),
  uuid: z.string(),
  created_at: z.number(),
});

const cdrSchema = z.object({
  id: z.number(),
  uuid: z.string(),
  site_id: z.number().optional(),
  dial_number: z.string(),
  extension: z.string().nullable(),
  msisdn: z.string(),
  answer_state: z.string().default('answered').nullable(),
  customer_state: z.string().nullable(),
  call_direction: z.string().nullable(),
  uuid_map: z.string().nullable(),
  transferred: z.number().default(0).nullable(),
  msisdn_digits: z.string().nullable(),
  agent_digits: z.string().nullable(),
  xml_path: z.string().nullable(),
  recording_path: z.string().nullable(),
  client_id: z.number().optional(),
  lat: z.string().nullable(),
  lng: z.string().nullable(),
  location: z.string().nullable(),
  location_tolerance: z.string().nullable(),
  autocall_campaign_id: z.number().optional(),
  address: z.string().nullable(),
  tapping_id: z.number().optional(),
  status: z.number().default(0).nullable(),
  // call_length: z
  //   .bigint()
  //   .default(() => BigInt(0)) // Set default BigInt value
  //   .nullable(),
  start_timestamp: z.string().nullable(),
  ring_timestamp: z.string().nullable(),
  answer_timestamp: z.string().nullable(),
  end_timestamp: z.string().nullable(),
  created_at: z.number(),
  created_by: z.number().nullable(),
  updated_at: z.number().nullable(),
  updated_by: z.number().nullable(),
  is_spam: z.number().default(0).nullable(),
  disposition: z.string().nullable(),
  early_to_time: z.number().default(0).nullable(),
  talk_time: z.number().default(0).nullable(),
  call_wait: z.number().default(0).nullable(),
});

const cdrResponseSchema = z.object({
  id: z.number(),
  uuid: z.string(),
  created_at: z.number(),
  dial_number: z.string(),
  answer_state: z.string().default('answered').nullable(),
  xml_path: z.string().nullable(),
  recording_path: z.string().nullable(),
  client_id: z.number().optional(),
  call_length: z.string(),
  start_timestamp: z.string().nullable(),
  ring_timestamp: z.string().nullable(),
  answer_timestamp: z.string().nullable(),
  end_timestamp: z.string().nullable(),
  talk_time: z.number().default(0).nullable(),
});

const cdrsSchema = z.array(cdrSchema);
const cdrResponsesSchema = z.array(cdrResponseSchema);

export type CdrIdType = z.infer<typeof cdrIdSchema>;
export type CdrType = z.infer<typeof cdrSchema>;

// Generate JSON schemas using fastify-zod
const { schemas: cdrSchemas, $ref } = buildJsonSchemas(
  {
    cdrSchema,
    cdrsSchema,
    cdrResponsesSchema,
  },
  { $id: 'cdrSchema' },
);

export { cdrSchemas, $ref };
