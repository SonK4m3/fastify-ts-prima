import { FastifyReply, FastifyRequest } from 'fastify';
import CdrService from '../services/cdr.services';
import CdrRepository from '../repositories/cdr.repository';
import { CdrIdType } from '../validators/cdr.schema';
import json from '../utils/formater';
import { bigint, z } from 'zod';

const cdrRepository: CdrRepository = new CdrRepository();
const cdrService: CdrService = new CdrService(cdrRepository);

class CdrController {
  constructor() {}

  async findByIdHandler(request: FastifyRequest<{ Params: CdrIdType }>, reply: FastifyReply) {
    const { id, uuid, created_at } = request.params;

    const cdr = await cdrService.findById({ id, uuid, created_at });
    if (!cdr) {
      return reply.code(404).send({
        message: 'Cdr not found',
      });
    }

    return cdr;
  }

  async getAllCdrsHandler(
    request: FastifyRequest<{
      Querystring: { start: number; limit: number };
    }>,
    reply: FastifyReply,
  ) {
    const { start, limit } = request.query;
    const cdrs = await cdrService.getAllCdrs(start, limit);
    // return json(cdrs);
    return cdrs;
  }
}

export default CdrController;
